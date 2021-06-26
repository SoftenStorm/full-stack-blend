import {TextHelper} from './TextHelper';
import {DEBUG_GITHUB_UPLOADER} from '../Constants';

declare const GITHUB_TOKEN: any;
declare const GITHUB_ALIAS: any;
declare const GITHUB_PROJECT: any;
declare const GITHUB_FEATURE_BRANCH: any;
declare const GITHUB_DEVELOP_BRANCH: any;
declare const GITHUB_STAGING_BRANCH: any;

var RepositoryHelper = {
  getGitHubInstance: () => {
    let GITHUB_TOKEN = window.TOKENS.filter(token => token.kind == 'github');
    if (GITHUB_TOKEN.length == 0) {
      alert('You cannot save until you have connected to a GitHub account.');
      return null;
    }
    
    GITHUB_TOKEN = GITHUB_TOKEN[0].accessToken;
    
    var gh = new GitHub({
      token: GITHUB_TOKEN
    });
    return gh;
  },
  getGitHubRepo: () => {
    let gh = RepositoryHelper.getGitHubInstance();
    if (gh == null) return;
    
    let repo = gh.getRepo(GITHUB_ALIAS, GITHUB_PROJECT);
    
    repo.createBlob = (content, previousSHA, cb) => {
      if (content) {
        content = TextHelper.removeMultipleBlankLines(content);
      }
      
      const hashCode = (value) => {
        let hash = 0, i, chr;
        for (i = 0; i < value.length; i++) {
          chr   = value.charCodeAt(i);
          hash  = ((hash << 5) - hash) + chr;
          hash |= 0; // Convert to 32bit integer
        }
        return hash;
      }
      const current = hashCode(content).toString();
      
      if (previousSHA && previousSHA.split('#')[1] === current) {
        cb(false, {sha: previousSHA}, null);
      } else {
        let utf8Bytes = encodeURIComponent(content).replace(/%([0-9A-F]{2})/g, function(match, p1) {
          return String.fromCharCode('0x' + p1);
        });
        
        let postBody = {
          content: btoa(utf8Bytes),
          encoding: 'base64'
        };
        
        return repo._request('POST', `/repos/${repo.__fullname}/git/blobs`, postBody, (error, result, request) => {
          if (!error && result.sha) {
            result.sha = result.sha + '#' + current;
          }
          cb(error, result, request);
        });
      }
    };
    repo.deleteFile = (path, cb) => {
      repo._request('GET', `/repos/${repo.__fullname}/contents/${path}?ref=${'heads/' + GITHUB_FEATURE_BRANCH}`, null, (error, result, request) => {
        if (error) {
          cb();
        } else {
          const deleteBody = {
            message: `Delete the file at ${path}`,
            sha: result.sha,
            branch: GITHUB_FEATURE_BRANCH
          }
          repo._request('DELETE', `/repos/${repo.__fullname}/contents/${path}`, deleteBody, cb);
        }
      });
    };
    
    return repo;
  },
  getProjectFile: (branch: string) => {
    return new Promise((resolve, reject) => {
      let repo = RepositoryHelper.getGitHubRepo();
      repo.getSingleCommit('heads/' + branch, (error, result, request) => {
        if (error) reject(new Error(`There was an error while retrieving the last commit, please try again.`));
        else {
          let baseCommitSHA = result && result.sha;
          let baseTreeSHA = result && result.commit && result.commit.tree.sha;
          if (DEBUG_GITHUB_UPLOADER) console.log('baseCommitSHA', baseCommitSHA);
          if (DEBUG_GITHUB_UPLOADER) console.log('baseTreeSHA', baseTreeSHA);
          
          repo.getTree(baseTreeSHA, (error, result, request) => {
            if (error) reject(new Error(`There was an error while retrieving project tree:\n${this.extractErrorMessage(error)}`));
            else {
              let previousProjectDataSHA = result.tree.filter(node => node.path == 'project.stackblend')[0] || null;
              if (previousProjectDataSHA) previousProjectDataSHA = previousProjectDataSHA.sha;
              if (DEBUG_GITHUB_UPLOADER) console.log('previousProjectDataSHA', previousProjectDataSHA);
              
              if (previousProjectDataSHA) {
                repo.getBlob(previousProjectDataSHA, (error, result, request) => {
                  if (error) reject(new Error(`There was an error while retrieving data:\n${this.extractErrorMessage(error)}`));
                  else {
                    if (typeof result !== 'object') {
                      reject(new Error(`The project data is malformed. Please reverse any changes you have done manually using git rebase tool.`));
                    }
                    resolve(result);
                  }
                });
              } else {
                resolve(null);
              }
            }
          });
        }
      });
    });
  },
  getMergeBaseProjectFile: (base: string, head: string) => {
    return new Promise((resolve, reject) => {
      let repo = RepositoryHelper.getGitHubRepo();
      repo.compareBranches('heads/' + base, 'heads/' + head, (error, result, request) => {
        if (error) reject(new Error(`There was an error while retrieving the last commit of merge base, please try again.`));
        else {
          let baseCommitSHA = result && result.merge_base_commit && result.merge_base_commit.sha
          let baseTreeSHA = result && result.merge_base_commit && result.merge_base_commit.commit.tree.sha;
          if (DEBUG_GITHUB_UPLOADER) console.log('mergeBaseCommitSHA', baseCommitSHA);
          if (DEBUG_GITHUB_UPLOADER) console.log('mergeBaseTreeSHA', baseTreeSHA);
          
          repo.getTree(baseTreeSHA, (error, result, request) => {
            if (error) reject(new Error(`There was an error while retrieving project tree:\n${this.extractErrorMessage(error)}`));
            else {
              let previousProjectDataSHA = result.tree.filter(node => node.path == 'project.stackblend')[0] || null;
              if (previousProjectDataSHA) previousProjectDataSHA = previousProjectDataSHA.sha;
              if (DEBUG_GITHUB_UPLOADER) console.log('previousProjectDataSHA', previousProjectDataSHA);
              
              if (previousProjectDataSHA) {
                repo.getBlob(previousProjectDataSHA, (error, result, request) => {
                  if (error) reject(new Error(`There was an error while retrieving data:\n${this.extractErrorMessage(error)}`));
                  else {
                    if (typeof result !== 'object') {
                      reject(new Error(`The project data is malformed. Please reverse any changes you have done manually using git rebase tool.`));
                    }
                    resolve(result);
                  }
                });
              } else {
                resolve(null);
              }
            }
          });
        }
      });
    });
  }
};

export {RepositoryHelper};
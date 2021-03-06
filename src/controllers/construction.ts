import {Request, Response} from "express";

/**
 * GET /editor
 * Editor page.
 */
export const index = (req: Request, res: Response) => {
    const user = req.user as UserDocument;
    
    if (!user) {
    	res.redirect('/account/authenticate');
    } else {
	    res.render("construction/index", {
	        user: user
	    });
    }
};

/**
 * GET /editor/construction/area
 * Construction area page.
 */
export const html = (req: Request, res: Response) => {
    const user = req.user as UserDocument;
		
		if (!user) {
    	res.redirect('/account/authenticate');
    } else {
	    res.render("construction/area/html/index", {
	        user: user
	    });
		}
};
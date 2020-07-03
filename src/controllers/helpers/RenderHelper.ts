// Auto[Generating:V1]--->
// PLEASE DO NOT MODIFY BECUASE YOUR CHANGES MAY BE LOST.

import {Response} from "express";

const RenderHelper = {
	json: (response: Response, data: any) => {
	  if (response.headersSent) return;
	  response.json({
			success: true,
			error: null,
			results: data,
			redirect: null
		});
	},
	navigate: (response: Response, data: string) => {
	  if (response.headersSent) return;
		response.json({
			success: true,
			error: null,
			results: null,
			redirect: data
		});
	},
	page: (response: Response, path: string, data: any) => {
	  if (response.headersSent) return;
	  response.render(path, {
	    data: JSON.stringify(data)
	  });
	},
	error: (response: Response, error: Error) => {
	  if (response.headersSent) return;
	  response.json({
			success: false,
			error: error.message,
			results: null,
			redirect: null
		});
	}
};

export {RenderHelper};

// <--- Auto[Generating:V1]
// PLEASE DO NOT MODIFY BECUASE YOUR CHANGES MAY BE LOST.
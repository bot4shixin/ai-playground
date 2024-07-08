export const EVAL_CONSTANTS = {
  LOG: {
    title: 'RAG Evaluation',
    href: '/dashboard/eval',
    label: 'RAG Evaluation',
  }
}

export enum API_RESPONSE_CODE {
  TOKEN_EXPIRED = 401,
}

const SEARCH_PILOT_API_PATH = "api/asyncsearchpilot/1.0";
export const SEARCH_PILOT_TOKEN_PATH = `${SEARCH_PILOT_API_PATH}/sso/token`;
export const SEARCH_PILOT_REFRESH_TOKEN_PATH = `${SEARCH_PILOT_API_PATH}/sso/token/refresh`;

const EVAL_API_PATH_PREFIX = `${SEARCH_PILOT_API_PATH}/aic_event`;
export const EVAL_API_PATHS = {
  LIST_EVENT_ITEMS: `${EVAL_API_PATH_PREFIX}/list`,
  POST_EVAL_COMMENT: `${EVAL_API_PATH_PREFIX}/comment`,
  POST_FEEDBACK: `${EVAL_API_PATH_PREFIX}/feedback`,
}
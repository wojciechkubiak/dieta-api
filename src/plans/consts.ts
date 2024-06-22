export const FOUND_RECORD = { status: 200, description: 'Found record' };
export const CREATED_RECORD = { status: 200, description: 'Created record' };
export const UPDATED_RECORD = { status: 200, description: 'Updated record' };
export const FORBIDDEN = { status: 403, description: 'Forbidden' };

export const GET_PLANS_BY_USER_ID_SUMMMARY = {
  summary: 'Get all plans for specific user',
};
export const GET_USER_PLANS_BY_STATUS_SUMMARY = {
  summary: 'Get all plans for specific user for defined status',
};
export const CREATE_EMPTY_PLAN_SUMMARY = { summary: 'Create empty plan' };
export const GET_PLAN_BY_ID_SUMMARY = {
  summary: 'Search for a plan of specific user',
};
export const UPDATE_PLAN_STATUS_SUMMARY = { summary: 'Update plan status' };
export const UPDATE_PLAN_NAME_SUMMARY = { summary: 'Update plan name' };

export const PLANS_NOT_FOUND = {
  schema: {
    type: 'object',
    example: {
      message:
        'Plans of user with id: 821f826d-4894-403d-baec-f4f362a3749 not found',
      error: 'Not Found',
      statusCode: 404,
    },
  },
};

export const PLAN_NOT_FOUND = {
  schema: {
    type: 'object',
    example: {
      message:
        'Plan: 6b6a52f8-e0c4-4bbb-9f08-e237f49b4432 not found for the user: 821f826d-4894-403d-baec-f4f362a37493',
      error: 'Not Found',
      statusCode: 404,
    },
  },
};
export const PLAN_CHANGES_NOT_SAVED = {
  schema: {
    type: 'object',
    example: {
      message:
        'Plan for the user: 821f826d-4894-403d-baec-f4f362a3749 not saved',
      error: 'Bad Request',
      statusCode: 400,
    },
  },
};
export const MISSING_STATUS_FIELD = {
  schema: {
    type: 'object',
    example: {
      message: 'status should not be empty',
      error: 'Bad Request',
      statusCode: 400,
    },
  },
};
export const MISSING_NAME_FIELD = {
  schema: {
    type: 'object',
    example: {
      message: 'name should not be empty',
      error: 'Bad Request',
      statusCode: 400,
    },
  },
};

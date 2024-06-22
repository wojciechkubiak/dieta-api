import { Plan } from './plan.entity';

export const API_RESPONSE_FOUND = {
  status: 200,
  description: 'Found record',
  type: Plan,
};
export const API_RESPONSE_SUCCESS_LIST = {
  schema: {
    statusCode: 200,
    type: 'array',
    items: {
      type: 'object',
      example: {
        name: 'New plan 1',
        userId: '821f826d-4894-403d-baec-f4f362a37493',
        status: 'ACTIVE',
      },
    },
  },
};
export const API_RESPONSE_CREATED = {
  status: 200,
  description: 'Created record',
  type: Plan,
};
export const API_RESPONSE_UPDATED = {
  status: 200,
  description: 'Updated record',
  type: Plan,
};
export const API_RESPONSE_FORBIDDEN = { status: 403, description: 'Forbidden' };

export const API_OPERATION_GET_PLANS_BY_USER_ID = {
  summary: 'Get all plans for specific user',
};
export const API_OPERATION_GET_USER_PLANS_BY_STATUS = {
  summary: 'Get all plans for specific user for defined status',
};
export const API_OPERATION_CREATE_EMPTY_PLAN = { summary: 'Create empty plan' };
export const API_OPERATION_GET_PLAN_BY_ID = {
  summary: 'Search for a plan of specific user',
};
export const API_OPERATION_UPDATE_PLAN_STATUS = {
  summary: 'Update plan status',
};
export const API_OPERATION_UPDATE_PLAN_NAME = { summary: 'Update plan name' };

export const API_RESPONSE_NOT_FOUND_PLANS = {
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

export const API_RESPONSE_NOT_FOUND_PLAN = {
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
export const API_NOT_FOUND_PLAN_NOT_SAVED = {
  schema: {
    type: 'object',
    example: {
      message:
        'Plan for the user: 821f826d-4894-403d-baec-f4f362a3749 not saved.',
      error: 'Bad Request',
      statusCode: 400,
    },
  },
};
export const API_NOT_FOUND_STATUS_FIELD = {
  schema: {
    type: 'object',
    example: {
      message: 'status should not be empty',
      error: 'Bad Request',
      statusCode: 400,
    },
  },
};
export const API_NOT_FOUND_NAME_FIELD = {
  schema: {
    type: 'object',
    example: {
      message: 'name should not be empty',
      error: 'Bad Request',
      statusCode: 400,
    },
  },
};

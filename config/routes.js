module.exports.routes = {
  'GET /api/v1/users/check/:name/:phone': {
    controller: 'UsersController',
    action: 'check',
    swagger: {
      tag: ['check-user'],
      summary: 'Check if user exists',
      consumes: ['application/json'],
      produces: ['application/json'],
      responses: {
        200: {
          description: 'User and phone found',
          schema: {
            type: 'object',
            properties: {
              message: { type: 'string', example: 'User already registred' },
            },
          },
        },
        400: {
          description: 'Missing parameters',
        },
        404: {
          description: 'User and phone not found',
        },
        500: {
          description: 'Internal server error',
        },
      },
      parameters: [
        {
          in: 'path',
          name: 'name',
          required: true,
          type: 'string',
          description: 'User nickname',
        },
        {
          in: 'path',
          name: 'phone',
          required: true,
          type: 'string',
          description: 'User phone (Ex: 17782222222 | 5531999999999)',
        },
      ],
      security: [
        {
          Authorization: [],
        },
      ],
    },
  },
  'POST /api/v1/users/create': {
    controller: 'UsersController',
    action: 'createFirstStep',
    swagger: {
      tag: ['first-step'],
      summary: 'Create first step for the user',
      consumes: ['application/json'],
      produces: ['application/json'],
      responses: {
        201: {
          description: 'User created successfully',
          schema: {
            type: 'object',
            properties: {
              id: { type: 'int', example: 0 },
              name: { type: 'string', example: '' },
              phone: { type: 'string', example: '31923411284' },
              nickname: { type: 'string', example: 'Joseph' },
              code: { type: 'int', example: 123 },
              gender: { type: 'string', example: 'male' },
              token: { type: 'string', example: 'token_common_user' },
              activated: { type: 'boolean', example: true },
            },
          },
        },
        400: {
          description: 'Missing parameters',
        },
        404: {
          description: 'User and phone not found',
        },
        500: {
          description: 'Internal server error',
        },
      },
      parameters: [
        {
          in: 'body',
          name: 'data',
          required: true,
          type: 'object',
          description: 'Body content',
          properties: {
            name: { type: 'string' },
            phone: { type: 'string' },
          },
        },
      ],
      security: [
        {
          Authorization: [],
        },
      ],
    },
  },
  'GET /api/v1/users/sms/:id': {
    controller: 'UsersController',
    action: 'sendSMS',
    swagger: {
      tag: ['send-sms'],
      summary: 'Send SMS for user by id',
      consumes: ['application/json'],
      produces: ['application/json'],
      responses: {
        200: {
          description: 'SMS sent successfully',
          schema: {
            type: 'object',
            properties: {
              message: { type: 'string', example: 'User already registred' },
            },
          },
        },
        400: {
          description: 'Missing parameters',
        },
        404: {
          description: 'User and phone not found',
        },
        500: {
          description: 'Internal server error',
        },
      },
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          type: 'string',
          description: 'User id',
        },
      ],
      security: [
        {
          Authorization: [],
        },
      ],
    },
  },
  'POST /api/v1/users/validateCode': {
    controller: 'UsersController',
    action: 'validateCode',
    swagger: {
      tag: ['validate-sms'],
      summary: 'Validate Code for user',
      consumes: ['application/json'],
      produces: ['application/json'],
      responses: {
        200: {
          description: 'SMS validate successfully',
          schema: {
            type: 'object',
            properties: {
              token: { type: 'string', example: 'token_common_user' },
            },
          },
        },
        400: {
          description: 'Missing parameters',
        },
        404: {
          description: 'User and phone not found',
        },
        500: {
          description: 'Internal server error',
        },
      },
      parameters: [
        {
          in: 'body',
          name: 'data',
          required: true,
          type: 'object',
          description: 'Body content',
          properties: {
            id: { type: 'integer' },
            code: { type: 'integer' },
          },
        },
      ],
      security: [
        {
          Authorization: [],
        },
      ],
    },
  },

  'PATCH /api/v1/users/updateProfile': {
    controller: 'UsersController',
    action: 'updateProfile',
    swagger: {
      tag: ['update-profile'],
      summary: 'Update profile for user',
      consumes: ['application/json'],
      produces: ['application/json'],
      responses: {
        200: {
          description: 'Updated successfully',
          schema: {
            type: 'object',
            properties: {
              id: { type: 'int', example: 0 },
              name: { type: 'string', example: '' },
              phone: { type: 'string', example: '31923411284' },
              nickname: { type: 'string', example: 'Joseph' },
              code: { type: 'int', example: 123 },
              gender: { type: 'string', example: 'male' },
              token: { type: 'string', example: 'token_common_user' },
              activated: { type: 'boolean', example: true },
            },
          },
        },
        400: {
          description: 'Missing parameters',
        },
        404: {
          description: 'User and phone not found',
        },
        500: {
          description: 'Internal server error',
        },
      },
      parameters: [
        {
          in: 'body',
          name: 'data',
          required: true,
          type: 'object',
          description: 'Body content',
          properties: {
            name: { type: 'string' },
            gender: { type: 'string' },
            birthDate: { type: 'string' },
          },
        },
      ],
    },
  },

  'POST /api/v1/conditions': {
    controller: 'ConditionsController',
    action: 'create',
    swagger: {
      tag: ['conditions-create'],
      summary: 'Create condition',
      consumes: ['application/json'],
      produces: ['application/json'],
      responses: {
        200: {
          description: 'Condition created successfully',
          schema: {
            type: 'object',
            properties: {
              language: { type: 'string', example: 'pt' },
              createdAt: { type: 'int', example: 1586723387394 },
              updatedAt: { type: 'int', example: 1586723387394 },
              id: { type: 'int', example: '' },
              name: { type: 'string', example: 123 },
            },
          },
        },
        400: {
          description: 'Missing parameters',
        },
        500: {
          description: 'Internal server error',
        },
      },
      parameters: [
        {
          in: 'body',
          name: 'data',
          required: true,
          type: 'object',
          description: 'Body content',
          properties: {
            name: { type: 'string' },
            language: { type: 'string' },
          },
        },
      ],
    },
  },
  'POST /api/v1/conditions/updateCondition/:id': {
    controller: 'ConditionsController',
    action: 'update',
    swagger: {
      tag: ['conditions-update'],
      summary: 'Update condition',
      consumes: ['application/json'],
      produces: ['application/json'],
      responses: {
        200: {
          description: 'Condition updated successfully',
          schema: {
            type: 'object',
            properties: {
              language: { type: 'string', example: 'pt' },
              createdAt: { type: 'string', example: 1586293846607 },
              updatedAt: { type: 'string', example: 1586366152316 },
            },
          },
        },
        400: {
          description: 'Missing parameters',
        },
        404: {
          description: 'Condition not found',
        },
        500: {
          description: 'Internal server error',
        },
      },
      parameters: [
        {
          in: 'body',
          name: 'data',
          required: true,
          type: 'object',
          description: 'Body content',
          properties: {
            name: { type: 'string' },
          },
        },
      ],
    },
  },
  'DELETE /api/v1/conditions/deleteCondition/:id': {
    controller: 'ConditionsController',
    action: 'delete',
    swagger: {
      tag: ['conditions-delete'],
      summary: 'Delete condition',
      consumes: ['application/json'],
      produces: ['application/json'],
      responses: {
        200: {
          description: 'Condition deleted successfully',
          schema: {
            type: 'object',
            properties: {
              id: { type: 'int', example: 0 },
              name: { type: 'string', example: 'Febre' },
              language: { type: 'string', example: 'pt' },
              createdAt: { type: 'string', example: 1586293846607 },
              updatedAt: { type: 'string', example: 1586366152316 },
            },
          },
        },
        400: {
          description: 'Missing parameters',
        },
        404: {
          description: 'Condition not found',
        },
        500: {
          description: 'Internal server error',
        },
      },
      parameters: [
        {
          in: 'body',
          name: 'data',
          required: false,
          type: 'object',
          description: 'Body content',
          properties: {
            name: { type: 'string' },
          },
        },
      ],
    },
  },
  'GET /api/v1/conditions': {
    controller: 'ConditionsController',
    action: 'get',
    swagger: {
      tag: ['conditions-get'],
      summary: 'Get all conditions',
      consumes: ['application/json'],
      produces: ['application/json'],
      responses: {
        200: {
          description: 'All Conditions',
          schema: {
            type: 'object',
            properties: {
              id: { type: 'int', example: 0 },
              name: { type: 'string', example: 'Febre' },
              language: { type: 'string', example: 'pt' },
              createdAt: { type: 'string', example: 1586293846607 },
              updatedAt: { type: 'string', example: 1586366152316 },
            },
          },
        },
        204: {
          description: 'No content',
        },
        500: {
          description: 'Internal server error',
        },
      },
    },
  },

  'POST /api/v1/users/conditions': {
    controller: 'ConditionsController',
    action: 'setConditionAndUser',
    swagger: {
      tag: ['conditions-set'],
      summary: 'Set condition for user',
      consumes: ['application/json'],
      produces: ['application/json'],
      responses: {
        200: {
          description: 'Condition created successfully',
        },
        400: {
          description: 'Missing parameters',
        },
        500: {
          description: 'Internal server error',
        },
      },
      parameters: [
        {
          in: 'body',
          name: 'data',
          required: true,
          type: 'object',
          description: 'Body content',
          properties: {
            conditions: { type: 'array', items: { type: 'number' } },
          },
        },
      ],
    },
  },

  'GET /api/v1/users/conditions': {
    controller: 'ConditionsController',
    action: 'getByUser',
    swagger: {
      tag: ['get-user-conditions'],
      summary: 'Get user conditions',
      consumes: ['application/json'],
      produces: ['application/json'],
      responses: {
        200: {
          description: 'Conditions found',
          schema: {
            type: 'object',
            properties: {
              id: { type: 'int', example: 0 },
              user: { type: 'int', example: 0 },
              createdAt: { type: 'string', example: 1586726020833 },
              updatedAt: { type: 'string', example: 1586726020833 },
              condition: {
                type: 'object',
                properties: {
                  createdAt: { type: 'int', example: 1586293846607 },
                  updatedAt: { type: 'int', example: 1586366152316 },
                  id: { type: 'int', example: 0 },
                  name: { type: 'string', example: 'Febre' },
                },
              },
            },
          },
        },
        404: {
          description: 'Conditions not found',
        },
        500: {
          description: 'Internal server error',
        },
      },
      security: [
        {
          Authorization: [],
        },
      ],
    },
  },

  'GET /api/v1/assessment': {
    controller: 'AssessmentsController',
    action: 'list',
    swagger: {
      tag: ['get-assessment'],
      summary: 'Get assessment questions',
      consumes: ['application/json'],
      produces: ['application/json'],
      responses: {
        200: {
          description: 'Assessment found',
          schema: {
            type: 'object',
            properties: {
              id: { type: 'int', example: 0 },
              name: { type: 'string', example: 'Febre' },
              language: { type: 'string', example: 'pt' },
            },
          },
        },
        204: {
          description: 'No assessments found',
        },
        404: {
          description: 'Assessment not found',
        },
        500: {
          description: 'Internal server error',
        },
      },
    },
  },

  'POST /api/v1/assessment': {
    controller: 'AssessmentsController',
    action: 'create',
    swagger: {
      tag: ['assessment-create'],
      summary: 'Create assessment',
      consumes: ['application/json'],
      produces: ['application/json'],
      responses: {
        200: {
          description: 'Assessments already registered!',
        },
        201: {
          description: 'Assessment created successfully',
          schema: {
            type: 'object',
            properties: {
              id: { type: 'int', example: 0 },
              name: { type: 'string', example: 'Febre' },
              language: { type: 'string', example: 'pt' },
            },
          },
        },
        400: {
          description: 'Missing parameters',
        },
        500: {
          description: 'Internal server error',
        },
      },
      parameters: [
        {
          in: 'body',
          name: 'data',
          required: true,
          type: 'object',
          description: 'Body content',
          properties: {
            name: { type: 'string' },
            language: { type: 'string' },
          },
        },
      ],
    },
  },

  'POST /api/v1/users/assessments': {
    controller: 'AssessmentsController',
    action: 'setUserAssessment',
    swagger: {
      tag: ['assessment-set'],
      summary: 'Set assessment for user',
      consumes: ['application/json'],
      produces: ['application/json'],
      responses: {
        201: {
          description: 'Assesment register for user successfully',
        },
        400: {
          description: 'Missing parameters',
        },
        500: {
          description: 'Internal server error',
        },
      },
      parameters: [
        {
          in: 'body',
          name: 'data',
          required: true,
          type: 'object',
          description: 'Body content',
          properties: {
            assessments: { type: 'number' },
            date: { type: 'string' },
            lat: { type: 'string' },
            long: { type: 'string' },
          },
        },
      ],
    },
  },

  'GET /api/v1/users/assessments': {
    controller: 'AssessmentsController',
    action: 'getByUser',
    swagger: {
      tag: ['get-user-assessments'],
      summary: 'Get user assessments',
      consumes: ['application/json'],
      produces: ['application/json'],
      responses: {
        200: {
          description: 'Assessments found',
          schema: {
            type: 'object',
            properties: {
              id: { type: 'int', example: 0 },
              user: { type: 'number', example: 1 },
              date: { type: 'string', example: '2015-03-25T12:00:00Z' },
              value: { type: 'number', example: 0 },
              lat: { type: 'string', example: '-19.920158' },
              long: { type: 'string', example: '-43.921271' },
              assessment: { type: 'number', example: 1 },
            },
          },
        },
        404: {
          description: 'Assessments not found',
        },
        500: {
          description: 'Internal server error',
        },
      },
    },
  },

  'POST /api/v1/users/auth': {
    controller: 'UsersController',
    action: 'auth',
    swagger: {
      tag: ['Users'],
      summary: 'Login for user',
      consumes: ['application/json'],
      produces: ['application/json'],
      responses: {
        200: {
          description: 'Condition created successfully',
          schema: {
            type: 'object',
            properties: {
              activated: { type: 'boolean', example: true },
              createdAt: { type: 'int', example: 1586371531741 },
              updatedAt: { type: 'int', example: 1586371540704 },
              id: { type: 'int', example: 0 },
              cpf: { type: 'string', example: '13058085241' },
              email: { type: 'string', example: 'example@example.com.br' },
              password: { type: 'string', example: '****' },
              phone: { type: 'string', example: '9312312123' },
              nickname: { type: 'string', example: 'joseph' },
              code: { type: 'int', example: 240638 },
              gender: { type: 'string', example: ['male', 'female', 'other'] },
              token: { type: 'string', example: 'token_common_user' },
            },
          },
        },
        400: {
          description: 'Missing parameters',
          type: 'string',
        },
        500: {
          description: 'Internal server error',
          type: 'string',
        },
      },
      parameters: [
        {
          in: 'body',
          name: 'data',
          required: true,
          type: 'object',
          description: 'Body content',
          properties: {
            name: { type: 'string' },
            phone: { type: 'string' },
            code: { type: 'number' },
            deviceToken: { type: 'string' },
          },
        },
      ],
    },
  },
  'POST /api/v1/users/active/:id': {
    controller: 'UsersController',
    action: 'activate',
    swagger: {
      tag: ['Users'],
      summary: 'Active User',
      consumes: ['application/json'],
      produces: ['application/json'],
      responses: {
        200: {
          description: 'User activated successfully',
          schema: {
            type: 'object',
            properties: {
              id: { type: 'int', example: 0 },
              nickname: { type: 'string', example: 'José Alberto' },
              activated: { type: 'boolean', example: true },
            },
          },
        },
        400: {
          description: 'Missing parameters',
          type: 'string',
        },
        404: {
          description: 'User not found',
          type: 'string',
        },
        500: {
          description: 'Internal server error',
          type: 'string',
        },
      },
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          type: 'int',
          description: 'User id',
        },
      ],
    },
  },
  'POST /api/v1/users/deactive/:id': {
    controller: 'UsersController',
    action: 'deactivate',
    swagger: {
      tag: ['Users'],
      summary: 'Deactive User',
      consumes: ['application/json'],
      produces: ['application/json'],
      responses: {
        200: {
          description: 'User deactivated successfully',
          schema: {
            type: 'object',
            properties: {
              id: { type: 'int', example: 0 },
              nickname: { type: 'string', example: 'José Alberto' },
              activated: { type: 'boolean', example: false },
            },
          },
        },
        400: {
          description: 'Missing parameters',
          type: 'string',
        },
        404: {
          description: 'User not found',
          type: 'string',
        },
        500: {
          description: 'Internal server error',
          type: 'string',
        },
      },
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          type: 'int',
          description: 'User id',
        },
      ],
    },
  },

  'POST /api/v1/web/users/auth': {
    controller: 'AdminUsersController',
    action: 'auth',
    swagger: {
      tag: ['Web Users'],
      summary: 'Login for web user',
      consumes: ['application/json'],
      produces: ['application/json'],
      responses: {
        200: {
          description: 'Condition created successfully',
          schema: {
            type: 'object',
            properties: {
              email: {
                type: 'string',
              },
              phone: {
                type: 'string',
              },
              name: {
                type: 'string',
              },
              gender: {
                type: 'string',
                example: 'female',
              },
              birthdate: {
                type: 'date',
                example: '',
              },
              token: { type: 'string', example: '44wa4dw486w11aw6d1w' },
            },
          },
        },
        404: {
          description: 'User or password is invalid',
          type: 'string',
        },
        500: {
          description: 'Internal server error',
          type: 'string',
        },
      },
      parameters: [
        {
          in: 'body',
          name: 'data',
          required: true,
          type: 'object',
          description: 'Body content',
          properties: {
            email: { type: 'string' },
            password: { type: 'string' },
          },
        },
      ],
    },
  },

  'POST /api/v1/web/users/create': {
    controller: 'AdminUsersController',
    action: 'create',
    swagger: {
      tag: ['create web users'],
      summary: 'Create web user',
      consumes: ['application/json'],
      produces: ['application/json'],
      responses: {
        200: {
          description: 'User already registered',
          schema: {
            type: 'object',
            properties: {
              email: {
                type: 'string',
              },
              phone: {
                type: 'string',
              },
              name: {
                type: 'string',
              },
              gender: {
                type: 'string',
                example: 'female',
              },
              birthdate: {
                type: 'date',
                example: '',
              },
              token: { type: 'string', example: '44wa4dw486w11aw6d1w' },
            },
          },
        },
        201: {
          description: 'User created successfully',
          schema: {
            type: 'object',
            properties: {
              cpf: {
                type: 'string',
              },
              email: {
                type: 'string',
              },
              phone: {
                type: 'string',
              },
              name: {
                type: 'string',
              },
              gender: {
                type: 'string',
                example: 'female',
              },
              birthdate: {
                type: 'date',
                example: '',
              },
              token: { type: 'string', example: '44wa4dw486w11aw6d1w' },
            },
          },
        },
        400: {
          description: 'Missing parameters',
        },
        500: {
          description: 'Internal server error',
        },
      },
      parameters: [
        {
          in: 'body',
          name: 'data',
          required: true,
          type: 'object',
          description: 'Body content',
          properties: {
            password: {
              type: 'string',
            },
            email: {
              type: 'string',
            },
            phone: {
              type: 'string',
            },
            name: {
              type: 'string',
            },
            gender: {
              type: 'string',
              example: 'female',
            },
            birthdate: {
              type: 'date',
              example: '',
            },
          },
        },
      ],
    },
  },

  'GET /api/v1/web/users': {
    controller: 'UsersController',
    action: 'getAll',
    swagger: {
      tag: ['common users'],
      summary: 'Shows all common users',
      consumes: ['application/json'],
      produces: ['application/json'],
      responses: {
        200: {
          description: 'Admin user found',
          schema: {
            type: 'object',
            properties: {
              active: { type: 'boolean', example: true },
              createdAt: { type: 'int', example: 1586371531741 },
              updatedAt: { type: 'int', example: 1586371540704 },
              id: { type: 'int', example: 0 },
              name: { type: 'string', example: 'José da Silva' },
              phone: { type: 'string', example: '9312312123' },
              nickname: { type: 'string', example: 'joseph' },
              code: { type: 'int', example: 240638 },
              gender: { type: 'string', example: ['male', 'female', 'other'] },
              token: { type: 'string', example: 'token_common_user' },
            },
          },
        },
        400: {
          description: 'Missing arguments',
        },
        500: {
          description: 'Internal server error',
        },
      },
    },
  },
  'GET /api/v1/web/getAdmin': {
    controller: 'AdminUsersController',
    action: 'get',
    swagger: {
      tag: ['common users'],
      summary: 'Shows logged admin',
      consumes: ['application/json'],
      produces: ['application/json'],
      responses: {
        200: {
          description: 'Users found',
          schema: {
            type: 'object',
            properties: {
              active: { type: 'boolean', example: true },
              createdAt: { type: 'int', example: 1586371531741 },
              updatedAt: { type: 'int', example: 1586371540704 },
              id: { type: 'int', example: 0 },
              cpf: { type: 'string', example: '13058085241' },
              email: { type: 'string', example: 'example@example.com.br' },
              password: { type: 'string', example: '****' },
              phone: { type: 'string', example: '9312312123' },
              nickname: { type: 'string', example: 'joseph' },
              code: { type: 'int', example: 240638 },
              gender: { type: 'string', example: ['male', 'female', 'other'] },
              token: { type: 'string', example: 'token_common_user' },
            },
          },
        },
        404: {
          description: 'No common user has been registered',
        },
        500: {
          description: 'Internal server error',
        },
      },
    },
  },

  'POST /api/v1/web/users/recoveryGreenCard': {
    controller: 'AdminUsersController',
    action: 'recoveryGreenCard',
    swagger: {
      tag: ['recovery green card'],
      summary: 'Recovery password admin user',
      consumes: ['application/json'],
      produces: ['application/json'],
      responses: {
        200: {
          description: 'Admin user found',
          schema: {
            type: 'object',
            properties: {
              success: { type: 'boolean', example: true },
            },
          },
        },
        400: {
          description: 'Missing arguments',
        },
        404: {
          description: 'Email not exists',
        },
        500: {
          description: 'Internal server error',
        },
      },
      parameters: [
        {
          in: 'body',
          name: 'data',
          required: true,
          type: 'object',
          description: 'Body content',
          properties: {
            email: { type: 'string', example: 'aa@aa.com.br' },
            tipo: {
              type: 'int',
              example: '1: send email code; 0: send sms code',
            },
          },
        },
      ],
    },
  },
  'POST /api/v1/web/users/validateCode': {
    controller: 'AdminUsersController',
    action: 'validateCode',
    swagger: {
      tag: ['validade web code'],
      summary: 'Recovery password admin user',
      consumes: ['application/json'],
      produces: ['application/json'],
      responses: {
        200: {
          description: 'Admin user found',
          schema: {
            type: 'object',
            properties: {
              success: { type: 'boolean', example: true },
            },
          },
        },
        400: {
          description: 'Missing arguments',
        },
        403: {
          description: '403 Forbidden',
        },
        404: {
          description: 'Invalid Admin',
        },
        500: {
          description: 'Internal server error',
        },
      },
      parameters: [
        {
          in: 'body',
          name: 'data',
          required: true,
          type: 'object',
          description: 'Body content',
          properties: {
            email: { type: 'string' },
            code: { type: 'string' },
          },
        },
      ],
    },
  },
  'POST /api/v1/web/users/update': {
    controller: 'AdminUsersController',
    action: 'updateProfile',
    swagger: {
      tag: ['update web user'],
      summary: 'Update web user',
      consumes: ['application/json'],
      produces: ['application/json'],
      responses: {
        201: {
          description: 'Admin User updated successfully',
          schema: {
            type: 'object',
            properties: {
              active: { type: 'boolean', example: true },
              createdAt: { type: 'int', example: 1586371531741 },
              updatedAt: { type: 'int', example: 1586371540704 },
              id: { type: 'int', example: 0 },
              cpf: { type: 'string', example: '13058085241' },
              email: { type: 'string', example: 'example@example.com.br' },
              password: { type: 'string', example: '****' },
              phone: { type: 'string', example: '9312312123' },
              nickname: { type: 'string', example: 'joseph' },
              code: { type: 'int', example: 240638 },
              gender: { type: 'string', example: ['male', 'female', 'other'] },
              token: { type: 'string', example: 'token_common_user' },
            },
          },
        },
        400: {
          description: 'Missing parameters',
        },
        404: {
          description: 'User and phone not found',
        },
        500: {
          description: 'Internal server error',
        },
      },
      parameters: [
        {
          in: 'body',
          name: 'data',
          required: true,
          type: 'object',
          description: 'Body content',
          properties: {
            data: { type: 'string' },
          },
        },
      ],
    },
  },
  'POST /api/v1/web/users/active/:id': {
    controller: 'AdminUsersController',
    action: 'activate',
    swagger: {
      tag: ['Users'],
      summary: 'Active User',
      consumes: ['application/json'],
      produces: ['application/json'],
      responses: {
        200: {
          description: 'User activated successfully',
          schema: {
            type: 'object',
            properties: {
              id: { type: 'int', example: 0 },
              nickname: { type: 'string', example: 'José Alberto' },
              activated: { type: 'boolean', example: true },
            },
          },
        },
        400: {
          description: 'Missing parameters',
          type: 'string',
        },
        404: {
          description: 'User not found',
          type: 'string',
        },
        500: {
          description: 'Internal server error',
          type: 'string',
        },
      },
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          type: 'int',
          description: 'User id',
        },
      ],
    },
  },
  'POST /api/v1/web/users/deactive/:id': {
    controller: 'AdminUsersController',
    action: 'deactivate',
    swagger: {
      tag: ['Users'],
      summary: 'Deactive User',
      consumes: ['application/json'],
      produces: ['application/json'],
      responses: {
        200: {
          description: 'User deactivated successfully',
          schema: {
            type: 'object',
            properties: {
              id: { type: 'int', example: 0 },
              nickname: { type: 'string', example: 'José Alberto' },
              activated: { type: 'boolean', example: false },
            },
          },
        },
        400: {
          description: 'Missing parameters',
          type: 'string',
        },
        404: {
          description: 'User not found',
          type: 'string',
        },
        500: {
          description: 'Internal server error',
          type: 'string',
        },
      },
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          type: 'int',
          description: 'User id',
        },
      ],
    },
  },
  'GET /api/v1/web/map': {
    controller: 'GeoController',
    action: 'getAll',
    swagger: {
      tag: ['get all points'],
      summary: 'Get all geographic data of covid',
      consumes: ['application/json'],
      produces: ['application/json'],
      responses: {
        200: {
          description: 'All Geographic data',
          schema: {
            type: 'array',
            items: {
              properties: {
                status: { type: 'string' },
                score: { type: 'number' },
                date: { type: 'string' },
                state: { type: 'string' },
                city: { type: 'string' },
                placeType: { type: 'string' },
                confirmed: { type: 'number' },
                deaths: { type: 'number' },
                isLast: { type: 'boolean' },
                ibgeCode: { type: 'number' },
                confRate: { type: 'number' },
                deathRate: { type: 'number' },
                x: { type: 'string' },
                y: { type: 'string' },
                geom: { type: 'string' },
              },
            },
          },
        },
        500: {
          description: 'Internal server error',
        },
      },
    },
  },

  'GET /api/v1/web/map/:city': {
    controller: 'GeoController',
    action: 'getByCity',
    swagger: {
      tag: ['get point by city'],
      summary: 'Get geographic data of covid by city',
      consumes: ['application/json'],
      produces: ['application/json'],
      responses: {
        200: {
          description: 'Get geographic data by city',
          schema: {
            type: 'object',
            properties: {
              status: { type: 'string' },
              score: { type: 'number' },
              date: { type: 'string' },
              state: { type: 'string' },
              city: { type: 'string' },
              placeType: { type: 'string' },
              confirmed: { type: 'number' },
              deaths: { type: 'number' },
              isLast: { type: 'boolean' },
              ibgeCode: { type: 'number' },
              confRate: { type: 'number' },
              deathRate: { type: 'number' },
              x: { type: 'string' },
              y: { type: 'string' },
              geom: { type: 'string' },
            },
          },
        },
        204: {
          description: 'No content',
        },
        500: {
          description: 'Internal server error',
        },
      },
      parameters: [
        {
          in: 'path',
          name: 'city',
          required: true,
          type: 'string',
          description: 'city name',
        },
      ],
    },
  },
  'DELETE /api/v1/users/assessments': {
    controller: 'AssessmentsController',
    action: 'deleteByUser',
    swagger: {
      tag: ['assessment-set'],
      summary: 'Set assessment for user',
      consumes: ['application/json'],
      produces: ['application/json'],
      responses: {
        200: {
          description: 'User assesments deleted successfully',
        },
        400: {
          description: 'Missing parameters',
        },
        500: {
          description: 'Internal server error',
        },
      },
      parameters: [
        {
          in: 'body',
          name: 'data',
          required: true,
          type: 'object',
          description: 'Body content',
          properties: {
            ids: { type: 'number' },
          },
        },
      ],
    },
  },
  'DELETE /api/v1/assessment/:id': {
    controller: 'AssessmentsController',
    action: 'delete',
    swagger: {
      tag: ['assessment-create'],
      summary: 'Create assessment',
      consumes: ['application/json'],
      produces: ['application/json'],
      responses: {
        200: {
          description: 'Assessments deleted!',
        },
        400: {
          description: 'Missing arguments',
        },
        404: {
          description: 'Assessments not found',
        },
        500: {
          description: 'Internal server error',
        },
      },
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          type: 'string',
          description: 'Assesment id',
        },
      ],
    },
  },
  'PUT /api/v1/assessment/:id': {
    controller: 'AssessmentsController',
    action: 'update',
    swagger: {
      tag: ['assessment-create'],
      summary: 'Create assessment',
      consumes: ['application/json'],
      produces: ['application/json'],
      responses: {
        200: {
          description: 'Assessments updated!',
          schema: {
            type: 'object',
            properties: {
              language: { type: 'string', example: 'pt' },
              createdAt: { type: 'int', example: 1586723387394 },
              updatedAt: { type: 'int', example: 1586723387394 },
              id: { type: 'int', example: 1 },
              name: { type: 'string', example: 'Febre' },
            },
          },
        },
        400: {
          description: 'Missing arguments',
        },
        404: {
          description: 'Assessments not found',
        },
        500: {
          description: 'Internal server error',
        },
      },
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          type: 'string',
          description: 'Assesment id',
        },
      ],
    },
  },
  'GET /api/v1/users/assessments/check': {
    controller: 'AssessmentsController',
    action: 'check',
    swagger: {
      tag: ['assessment-set'],
      summary: 'Set assessment for user',
      consumes: ['application/json'],
      produces: ['application/json'],
      responses: {
        200: {
          description: 'Check user status',
          schema: {
            type: 'object',
            properties: {
              message: { type: 'boolean', example: true },
            },
          },
        },
        400: {
          description: 'Missing parameters',
        },
        500: {
          description: 'Internal server error',
        },
      },
    },
  },
  /** *************************************************************************
   *                                                                          *
   * More custom routes here...                                               *
   * (See https://sailsjs.com/config/routes for examples.)                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the routes in this file, it   *
   * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
   * not match any of those, it is matched against static assets.             *
   *                                                                          *
   ************************************************************************** */
};

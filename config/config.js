const dotenv = require('dotenv');
const path = require('path');
const { Joi } = require('celebrate');

switch(process.env.NODE_ENV){
	case 'development':
		dotenv.config({ path: path.join(__dirname, '../.env.dev'), override: true });
		break;
	case 'local':
		dotenv.config({ path: path.join(__dirname, '../.env.local'), override: true });
		break;
	default:
		dotenv.config({ path: path.join(__dirname, '../.env'), override: true });
		break;
}

const envVarsSchema = Joi.object()
	.keys({
		NODE_ENV: Joi.string()
			.valid('development', 'local')
			.default('development'),
		PORT: Joi.number().default(8080),
		DATABASE_URL: Joi.string().required(),
	})
	.unknown();



const { value: envVars, error } = envVarsSchema
	.prefs({ errors: { label: 'key' } })
	.validate(process.env);

if (error) {
	throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
	env: envVars.NODE_ENV,
	port: envVars.PORT,
	database_url: envVars.DATABASE_URL,
};

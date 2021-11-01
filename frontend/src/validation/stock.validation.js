import * as yup from "yup";

const stockSchema = yup.object().shape({
	stockName: yup.string().required(),
	transactionType: yup.string().required(),
	price: yup.number().required(),
	quantity: yup.number().required(),
	transactionDate: yup.string().required(),
});

export default stockSchema;

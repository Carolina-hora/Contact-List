const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: []
		},
		actions: {
			getContacts: async () => {
				const response = await fetch ("https://assets.breatheco.de/apis/fake/contact/agenda/evelyn-hugo");
				const data = await response.json();
				setStore({contacts: data})
				//console.log(data)

			},
			// modifyContacts: async () => {
			// 	const response = await fetch ("https://assets.breatheco.de//apis/fake/contact/"+{params.id})
			// }
		}
	};
};

export default getState;

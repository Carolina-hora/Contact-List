import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Contact } from "../component/contact"
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);
	return (

		<div className="container">
			{store.contacts.map((contact) => (
				<Contact key={contact.id} item={contact} />
			))}

		</div>
	)
}

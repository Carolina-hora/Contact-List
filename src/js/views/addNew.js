import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

import "../../styles/demo.css";

export const AddNew = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()
	const [newContact, setNewContact] = useState({full_name: "", email: "", agenda_slug: "evelyn-hugo", address: "", phone: ""});
	const createNewContact = async () => {
		const response = await fetch("https://assets.breatheco.de/apis/fake/contact/", {
				method: "POST",
				headers: {
					"Content-type": "application/json"
				},
				body: JSON.stringify(newContact)
			});
		console.log (response)
		if(response.ok){
			await actions.getContacts();
			navigate("/");
		}
	}
	const handleSubmit = (event) => {
		event.preventDefault();
		createNewContact();
	}


	return (
		<div className="container">
			<h1 className="text-center">Add a new contact</h1>
			<form onSubmit={handleSubmit}>
				<div className="mb-3">
					<label htmlFor="full_name" className="form-label">Full Name</label>
					<input type="text" value={newContact.full_name} className="form-control" placeholder="Full Name" id="full_name" onChange={(e) => setNewContact({...newContact, full_name: e.target.value})}/>
				</div>
				<div className="mb-3">
					<label htmlFor="email" className="form-label">Email</label>
					<input type="email" value={newContact.email} className="form-control" id="exampleFormControlInput1" placeholder="Enter email" onChange={(e) => setNewContact({...newContact, email: e.target.value})}/>
				</div>
				<div className="mb-3">
					<label htmlFor="phone" className="form-label">Phone</label>
					<input type="phone" value={newContact.phone} className="form-control" id="exampleFormControlInput1" placeholder="Enter phone" onChange={(e) => setNewContact({...newContact, phone: e.target.value})}/>
				</div>
				<div className="mb-3">
					<label htmlFor="address" className="form-label">Address</label>
					<input type="text" value={newContact.address} className="form-control" placeholder="Enter address" id="address" onChange={(e) => setNewContact({...newContact, address: e.target.value})}/>
				</div>
				<div className="row">
					<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 mb-3">
						<button type="submit" className="btn btn-primary w-100">Save</button>
					</div>
				</div>
			</form>
			<Link to="/">
				<p className="mt-2">Return to Contacts</p>
			</Link>
		</div>
	);
};

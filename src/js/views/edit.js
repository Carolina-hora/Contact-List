import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Edit = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()
	const params = useParams();
	const [editContact, setEditContact] = useState({
		full_name: "", email: "", agenda_slug: "evelyn-hugo", address: "", phone: ""
	})

	useEffect(()=> {
		fetchContact()
	}, [])

	const modifyContacts = async () => {
		const response = await fetch("https://assets.breatheco.de/apis/fake/contact/" + params.theid, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(editContact)
		})
		if(response.ok){
			await actions.getContacts();
			navigate("/");
		}
	}
	
	const fetchContact = async () => {
		const response = await fetch("https://assets.breatheco.de/apis/fake/contact/" + params.theid)
		const data = await response.json();
		setEditContact(data);
	}

	return (
		<div className="container">
			<h1 className="text-center">Edit contact</h1>
			<form>
				<div className="mb-3">
					<label htmlFor="full_name" className="form-label">Full Name</label>
					<input className="form-control" placeholder="Full Name" id="full_name" aria-describedby="full_name" value={editContact.full_name} onChange={(e) => setEditContact({ ...editContact, full_name: e.target.value })} />
				</div>
				<div className="mb-3">
					<label htmlFor="email" className="form-label">Email</label>
					<input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Enter email" value={editContact.email} onChange={(e) => setEditContact({ ...editContact, email: e.target.value })} />
				</div>
				<div className="mb-3">
					<label htmlFor="phone" className="form-label">Phone</label>
					<input type="phone" className="form-control" id="exampleFormControlInput1" placeholder="Enter phone" value={editContact.phone} onChange={(e) => setEditContact({ ...editContact, phone: e.target.value })} />
				</div>
				<div className="mb-3">
					<label htmlFor="address" className="form-label">Address</label>
					<input type="text" className="form-control" placeholder="Enter address" id="fullName" aria-describedby="address" value={editContact.address} onChange={(e) => setEditContact({ ...editContact, address: e.target.value })} />
				</div>
				<div className="row">
					<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 mb-3">
						<button type="submit" className="btn btn-primary w-100" onClick={() => modifyContacts()}>Save</button>
					</div>
				</div>
			</form>
			<Link to="/">
				<p className="mt-2">Return to Contacts</p>
			</Link>
		</div>
	);
};

Edit.propTypes = {
	match: PropTypes.object
};

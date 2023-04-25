import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

export const Contact = ({ item }) => {
    const { store, actions } = useContext(Context);
    
    const deleteContact = async (contactId) => {
        const response = await fetch ("https://assets.breatheco.de/apis/fake/contact/" + contactId, {
            method: "DELETE",
            headers: {
                "Content-type" : "application/json"
            }
        });
        if(response.ok){
            await actions.getContacts()
        }
        
}
    return (
        <div className="row border border-secondary-subtle">
            <div className="col-3 col-sm-3 col-md-3 col-lg-3 d-flex justify-content-center"> <img src='https://picsum.photos/id/64/100/100' className="rounded-circle" /></div>
            <div className="col-6 col-sm-6 col-md-6 col-lg-6">
                <p>{item.full_name}</p>
                <p><FontAwesomeIcon icon={faLocationDot} /> {item.address}</p>
                <p><FontAwesomeIcon icon={faPhone} /> {item.phone}</p>
                <p><FontAwesomeIcon icon={faEnvelope} /> {item.email}</p>
            </div>
            <div className="col-3 col-sm-3 col-md-3 col-lg-3 d-flex">
                <div className="col-1 col-sm-1 col-md-1 col-lg-1">
                    <Link to={"/edit/" + item.id}><button className="btn btn-white"><i className="fas fa-pencil-alt" /></button></Link>
                </div>

                <div className="col-1 col-sm-1 col-md-1 col-lg-1 offset-3"><button type="button" className="btn btn-white" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    <i className="fas fa-trash-alt" />
                </button></div>
            </div>
            {/* Modal Content */}
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Delete Contact</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete this contact? This can't be undone!
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-danger" onClick={async(e)=> {
                                await deleteContact(item.id)
                                e.target.setAttribute("data-bs-dismiss", "modal")
                                }} data-bs-dismiss="modal">OK</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
};

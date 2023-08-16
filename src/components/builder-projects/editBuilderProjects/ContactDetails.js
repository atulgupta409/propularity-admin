import React, { useState, useEffect } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { AiFillDelete } from "react-icons/ai";
import { EditProjectState } from "../../../context/EditProjectContext";
const ContactDetails = () => {
  const { contacts, setContacts, editProject } = EditProjectState();
  const contactDetailsArray = editProject?.contact_details;
  const createContact = () => {
    const newRow = {
      id: contacts.length + 1,
      user: "",
      email: "",
      phone: "",
      designation: "",
    };

    setContacts((prevRows) => [...prevRows, newRow]);
  };
  useEffect(() => {
    if (contactDetailsArray) {
      setContacts(contactDetailsArray);
    }
  }, [editProject]);
  const removeContact = (id) => {
    setContacts((prevRows) => prevRows.filter((row) => row.id !== id));
  };

  const handleInputContactChange = (e, id) => {
    const { name, value } = e.target;
    setContacts((prevRows) =>
      prevRows.map((row) => {
        if (row.id === id) {
          return { ...row, [name]: value };
        }
        return row;
      })
    );
  };
  return (
    <>
      {" "}
      <div className="row top-margin pt-4">
        <div className="col-md-3 d-flex justify-content-between align-items-center">
          <h4 className="property_form_h4">Contact Details</h4>
          <IoIosAddCircle
            onClick={createContact}
            className="icon"
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
      <div className="mb-5">
        {contacts?.map((row, id) => (
          <div className="row pt-3" key={row.id}>
            <div className="col-md-3">
              <div
                className="form-floating border_field"
                style={{ marginTop: "6px" }}
              >
                <input
                  type="text"
                  className="form-control"
                  id="floatingInputUser"
                  placeholder="User*"
                  name="user"
                  value={row.user}
                  onChange={(e) => handleInputContactChange(e, row.id)}
                />
                <label htmlFor="floatingInputUser">Name</label>
              </div>
            </div>
            <div className="col-md-3">
              <div
                className="form-floating border_field"
                style={{ marginTop: "6px" }}
              >
                <input
                  type="text"
                  className="form-control"
                  id="floatingInputEmail"
                  placeholder="Email*"
                  name="email"
                  value={row.email}
                  onChange={(e) => handleInputContactChange(e, row.id)}
                />
                <label htmlFor="floatingInputEmail">Email</label>
              </div>
            </div>
            <div className="col-md-3">
              <div
                className="form-floating border_field"
                style={{ marginTop: "6px" }}
              >
                <input
                  type="text"
                  className="form-control"
                  id="floatingInputPhone"
                  placeholder="Phone"
                  name="phone"
                  value={row.phone}
                  onChange={(e) => handleInputContactChange(e, row.id)}
                />
                <label htmlFor="floatingInputPhone">Phone</label>
              </div>
            </div>
            <div className="col-md-3 d-flex justify-content-between align-items-center">
              <div
                className="form-floating border_field"
                style={{ marginTop: "6px" }}
              >
                <input
                  type="text"
                  className="form-control"
                  id="floatingInputDesignation"
                  placeholder="Relation"
                  name="designation"
                  value={row.designation}
                  onChange={(e) => handleInputContactChange(e, row.id)}
                />
                <label htmlFor="floatingInputDesignation">Relation</label>
              </div>
              <div className="d-flex align-items-center">
                <AiFillDelete
                  className="icon"
                  style={{ cursor: "pointer", marginTop: "14px" }}
                  onClick={() => removeContact(row.id)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ContactDetails;

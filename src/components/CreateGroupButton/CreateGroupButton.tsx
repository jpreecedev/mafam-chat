import React from "react";
import Modal from "react-modal";
import firebase from "firebase/app";

import styles from "./styles.module.css";
import { CHATS_REF } from "../../constants";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0,0,0,.5)"
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

const isValid = (e: React.FormEvent<HTMLFormElement>, groupName: string) => {
  e.preventDefault();
  if (!groupName) {
    return false;
  }

  const currentUser = firebase.auth().currentUser;
  if (!currentUser) {
    return false;
  }

  return true;
};

const CreateGroupButton = () => {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [groupName, setGroupName] = React.useState("");

  let inputRef: HTMLInputElement | null = null;

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const createGroupInFirebase = (
    e: React.FormEvent<HTMLFormElement>,
    groupName: string
  ) => {
    if (!isValid(e, groupName)) {
      return;
    }

    const currentUserId = firebase.auth().currentUser?.uid;
    if (!currentUserId) {
      throw new Error("User is not correctly authenticated");
    }

    firebase
      .database()
      .ref(CHATS_REF)
      .push({
        name: groupName,
        created: firebase.database.ServerValue.TIMESTAMP,
        participants: {
          [currentUserId]: true
        }
      });

    setModalIsOpen(false);
  };

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={() => {
          inputRef?.focus();
        }}
        onRequestClose={closeModal}
        contentLabel="New Group"
        style={customStyles}
      >
        <h3 className={styles.heading}>Give the new group a name</h3>
        <div className={styles.modalContent}>
          <form onSubmit={e => createGroupInFirebase(e, groupName)}>
            <input
              id="new-group-name"
              name="new-group-name"
              placeholder="Enter group name"
              type="text"
              ref={ref => (inputRef = ref)}
              required
              minLength={3}
              onChange={e => setGroupName(e.target.value)}
            />
            <div className={styles.modalButtons}>
              <button
                className="button secondary"
                onClick={() => setModalIsOpen(false)}
                type="button"
              >
                Cancel
              </button>
              <button className="button" type="submit">
                Create
              </button>
            </div>
          </form>
        </div>
      </Modal>
      <footer>
        <button className="button" onClick={() => setModalIsOpen(true)}>
          Create Group
        </button>
      </footer>
    </>
  );
};

export { CreateGroupButton };

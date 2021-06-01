import React, { useState, useEffect } from "react";
import { MakePostRequest, MakeGetRequest } from "../helpers/httpRequest";

export const MessageBoardComponent = () => {
    const [message, setMessage] = useState("");
    const [allMessages, setAllMessages] = useState([]);
    const [subject, setSubject] = useState("");
    const [refesUI, setRefreshUI] = useState(false);
    const [currentActive, setCurrentActive] = useState("Message Board");

    const LoadMessages = () => {
        MakeGetRequest("api/message-board/get-messages")
            .then((res) => res.json())
            .then((response) => {
                setAllMessages(response.messages.reverse());
            });
    };

    const ResetMessages = () => {
        MakePostRequest("api/message-board/reset-messages", {}).then((res) => {
            setMessage("");
            setSubject("");
            LoadMessages();
        });
    };

    useEffect(() => {
        LoadMessages();
    }, [refesUI]);

    const isActive = (value) => {
        return currentActive === value;
    };
    const HandleSubjectChange = (e) => {
        setSubject(e.currentTarget.value);
    };

    const HandleTextAreaChange = (e) => {
        setMessage(e.currentTarget.value);
    };

    const HandleSendMessage = () => {
        MakePostRequest("api/message-board/send-message", {
            subject: subject,
            message: message,
        }).then((res) => {
            setMessage("");
            setSubject("");
            setRefreshUI(!refesUI);
        });
    };
    return (
        <div>
            <div class="tabs is-centered">
                <ul>
                    <li
                        onClick={() => setCurrentActive("Message Board")}
                        class={isActive("Message Board") ? "is-active" : ""}
                    >
                        <a>Message Board</a>
                    </li>
                    <li
                        onClick={() => setCurrentActive("My Comments")}
                        class={isActive("My Comments") ? "is-active" : ""}
                    >
                        <a>My Comments</a>
                    </li>
                </ul>
            </div>

            {isActive("Message Board") && (
                <div class="container has-text-centered">
                    <label class="label has-text-left">Name</label>
                    <input
                        class="input"
                        value={subject}
                        onChange={HandleSubjectChange}
                    ></input>
                    <label class="label has-text-left">Message</label>
                    <textarea
                        value={message}
                        onChange={HandleTextAreaChange}
                        class="textarea"
                    ></textarea>
                    <button
                        class="button is-success is-medium"
                        onClick={HandleSendMessage}
                    >
                        Add Message
          </button>

                    {allMessages.map((r) => {
                        return (
                            <article class="message has-text-left">
                                <div class="message-header">
                                    <p>{r.subject}</p>
                                </div>
                                <div class="message-body">{r.message}</div>
                            </article>
                        );
                    })}

                    {allMessages.length > 0 && (
                        <button onClick={ResetMessages} class="button is-danger">
                            RESET BOARD
                        </button>
                    )}
                </div>
            )}

            {isActive("My Comments") && (
                <div class="container">
                    <p class=" has-text-centered is-size-2 header">
                        Documented trade-offs
          </p>

                    <p class=" has-text-left is-size-3 has-text-dark">
                        Due too limited time (Approx 1 hour) I had to resign from:
          </p>
                    <br />
                    <br />
                    <ul class="ul">
                        <li>◌ Setting up my project with TypeScript </li>

                        <li>◌ Adding validation to form</li>

                        <li>◌ Checks for swearing ****</li>

                        <li>◌ Adding an option to edit or delete</li>

                        <li>◌ Cleaning up my code</li>

                        <li>◌ Adding fancy animations and make it looks prettier</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

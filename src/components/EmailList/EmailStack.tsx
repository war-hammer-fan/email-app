import style from "./EmailStack.module.css";
import emailApi from "../../services/api/email";
import { useState, useEffect } from "react";
import { Email } from "../../services/model/email";

export interface EmailStackProps {
  emails?: Email[];
  selectAll?: boolean;
}

interface EmailItemProps {
  email: Email;
  selectAll?: boolean;
  onSelect: (emailId: string, selected: boolean) => void;
}
 
const EmailItem = (props: EmailItemProps) => {
  const [selected, setSelected] = useState(false);
  const handleEmailItemCheckbox = () => {
    setSelected(!selected && props.selectAll ? true : !selected);
  };

  return (
    <div className={style.emailItemContainer}>
      <div className={style.emailItemCheckbox}>
        <input
          type="checkbox"
          checked={selected}
          onChange={handleEmailItemCheckbox}
        />
      </div>
      <div className={style.emailItemSender}>{props.email.from}</div>
      <div className={style.emailItemSubject}>{props.email.subject}</div>
      <div className={style.emailItemBody}>{props.email.body}</div>
      <div className={style.emailItemDateOrTime}>{props.email.date}</div>
    </div>
  );
};

export default function EmailStack(props: EmailStackProps) {
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(props.selectAll ? true : false);

  const handleEmailSelect = (emailId: string, selected: boolean) => {
    let updatedSelectedEmails: string[];

    if (selected) {
      updatedSelectedEmails = [...selectedEmails, emailId];
    } else {
      updatedSelectedEmails = selectedEmails.filter((id) => id !== emailId);
    }

    setSelectedEmails(updatedSelectedEmails);
    if (props.emails) {
      setSelectAll(updatedSelectedEmails.length === props.emails.length);
    }
  };

  const handleSelectAll = () => {
    let allEmailIds: string[] = [];
    if (props.emails) {
    allEmailIds = props.emails.map((email) => email.id);
    }

    if (selectAll) {
      setSelectedEmails([]);
    } else {
      setSelectedEmails(allEmailIds);
    }

    setSelectAll(!selectAll);
  };

  return (
    <div className={style.container}>
      {props.emails && props.emails.map((email) => {
        return (
          <>
            <EmailItem
              key={email.id}
              email={email}
              onSelect={() => handleEmailSelect(email.id, !selectedEmails.includes(email.id))}
            />
          </>
        );
      })}
    </div>
  );
}

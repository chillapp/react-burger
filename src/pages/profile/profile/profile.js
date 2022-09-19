import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import React, {useCallback, useRef, useState} from "react";
import {updateUser} from "../../../services/actions/auth";

export default function ProfileProfilePage() {
    const dispatch = useDispatch();
    const user = useSelector(store => store.auth.user);

    const userNameRef = useRef(null);
    userNameRef.originalValue = user.name;
    const [userName, setUserName] = useState(user.name || '');
    const [userNameEdit, setUserNameEdit] = useState(false);

    const userEmailRef = useRef(null);
    userEmailRef.originalValue = user.email;
    const [userEmail, setUserEmail] = useState(user.email || '');
    const [userEmailEdit, setUserEmailEdit] = useState(false);

    const userPwdRef = useRef(null);
    userPwdRef.originalValue = '';
    const [userPwd, setUserPwd] = useState('');
    const [userPwdEdit, setUserPwdEdit] = useState(false);

    const [canUpdate, setCanUpdate] = useState(false);

    const toggleEditField = (ref, value, setter) => {
        setter(!value);
        if (!value) setTimeout(() => ref.current.focus());
        else if (ref.originalValue !== ref.current.value) {
            setCanUpdate(true);
        }
    }

    const saveUser = useCallback(() => {
        const payload = {};
        if (userPwd) payload.password = userPwd;
        if (userName !== user.name) payload.name = userName;
        if (userEmail !== user.email) payload.email = userEmail;
        dispatch(updateUser(payload));
        setCanUpdate(false);
    })

    const cancelSave = useCallback(() => {
        setUserName(user.name);
        setUserNameEdit(false);

        setUserEmail(user.email);
        setUserEmailEdit(false);

        setUserPwd('');
        setUserPwdEdit(false);

        setCanUpdate(false);
    });

    const updateState = useSelector(store => store.auth.updateUser);

    return (
        <section>
            <div>
                <Input
                    value={userName}
                    placeholder="Имя"
                    ref={userNameRef}
                    disabled={userNameEdit === false}
                    onChange={e => setUserName(e.target.value)}
                    icon={userNameEdit ? "CheckMarkIcon" : "EditIcon"}
                    onIconClick={toggleEditField.bind(this, userNameRef, userNameEdit, setUserNameEdit)}
                />
            </div>
            <div className={`pt-6`}>
                <Input
                    value={userEmail}
                    placeholder="Логин"
                    ref={userEmailRef}
                    disabled={userEmailEdit === false}
                    onChange={e => setUserEmail(e.target.value)}
                    icon={userEmailEdit ? "CheckMarkIcon" : "EditIcon"}
                    onIconClick={toggleEditField.bind(this, userEmailRef, userEmailEdit, setUserEmailEdit)}
                />
            </div>
            <div className={`pt-6`}>
                <Input
                    type="password"
                    value={userPwd}
                    placeholder="Пароль"
                    ref={userPwdRef}
                    disabled={userPwdEdit === false}
                    onChange={e => setUserPwd(e.target.value)}
                    icon={userPwdEdit ? "CheckMarkIcon" : "EditIcon"}
                    onIconClick={toggleEditField.bind(this, userPwdRef, userPwdEdit, setUserPwdEdit)}
                />
            </div>
            {updateState.error && <span className='text_type_main-small text_color_error mt-6'>{updateState.error}</span>}
            <div className={`pt-6`}>
                <Button type="secondary" disabled={canUpdate === false} onClick={cancelSave}>Отменить</Button>
                <Button disabled={canUpdate === false} onClick={saveUser}>Сохранить</Button>
            </div>
        </section>
    );
}

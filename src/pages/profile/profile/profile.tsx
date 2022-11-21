import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {FC, FormEvent, useCallback, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "../../../redux/hooks";
import {TUserUpdateRequest} from "../../../redux/types/user";
import {userUpdateThunk} from "../../../redux/actions/user";

interface IExtRef extends React.RefObject<any>{
    originalValue: string
}

export const ProfileProfilePage: FC = () => {
    const dispatch = useDispatch();
    const {
        user
    } = useSelector(store => store.user);

    const originalValues = {
        name: user?.name || "",
        email: user?.email || "",
        pwd: "",
    }

    const userNameRef = useRef<HTMLInputElement>(null) as IExtRef;
    const [userName, setUserName] = useState<string>(user?.name || "");
    const [userNameEdit, setUserNameEdit] = useState<boolean>(false);

    const userEmailRef = useRef<HTMLInputElement>(null) as IExtRef;
    const [userEmail, setUserEmail] = useState<string>(user?.email || "");
    const [userEmailEdit, setUserEmailEdit] = useState<boolean>(false);

    const userPwdRef = useRef<HTMLInputElement>(null) as IExtRef;
    const [userPwd, setUserPwd] = useState<string>('');
    const [userPwdEdit, setUserPwdEdit] = useState<boolean>(false);

    const [canUpdate, setCanUpdate] = useState<boolean>(false);

    useEffect(() => {
        if (
            userName !== originalValues.name ||
            userEmail !== originalValues.email ||
            userPwd !== originalValues.pwd
        ) {
            setCanUpdate(true);
        } else setCanUpdate(false);
    }, [userName, userEmail, userPwd, originalValues.name, originalValues.email, originalValues.pwd])

    const toggleEditField = (originalValue: string, ref: IExtRef, value: boolean, setter: Function) => {
        setter(!value);
        if (!value) setTimeout(() => ref.current.focus());
        else if (originalValue !== ref.current.value) {
            setCanUpdate(true);
        }
    }

    const saveUser = useCallback((e: FormEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const payload: TUserUpdateRequest = {};
        if (userPwd) payload.password = userPwd;
        if (userName !== user?.name) payload.name = userName;
        if (userEmail !== user?.email) payload.email = userEmail;
        dispatch(userUpdateThunk(payload));
        setCanUpdate(false);
        setUserNameEdit(false);
        setUserEmailEdit(false);
        setUserPwdEdit(false);
    }, [userPwd, userName, user?.name, user?.email, userEmail, dispatch])

    const cancelSave = useCallback(() => {
        setUserName(user?.name || "");
        setUserNameEdit(false);

        setUserEmail(user?.email || "");
        setUserEmailEdit(false);

        setUserPwd('');
        setUserPwdEdit(false);

        setCanUpdate(false);
    }, [user?.email, user?.name]);

    return (
        <form onSubmit={saveUser}>
            <div>
                <Input
                    name="name"
                    value={userName}
                    placeholder="Имя"
                    ref={userNameRef}
                    disabled={!userNameEdit}
                    onChange={e => setUserName(e.target.value)}
                    icon={userNameEdit ? "CheckMarkIcon" : "EditIcon"}
                    onIconClick={toggleEditField.bind(this, originalValues.name, userNameRef, userNameEdit, setUserNameEdit)}
                />
            </div>
            <div className={`pt-6`}>
                <Input
                    name="email"
                    value={userEmail}
                    placeholder="Логин"
                    ref={userEmailRef}
                    disabled={!userEmailEdit}
                    onChange={e => setUserEmail(e.target.value)}
                    icon={userEmailEdit ? "CheckMarkIcon" : "EditIcon"}
                    onIconClick={toggleEditField.bind(this, originalValues.email, userEmailRef, userEmailEdit, setUserEmailEdit)}
                />
            </div>
            <div className={`pt-6`}>
                <Input
                    name="password"
                    type="password"
                    value={userPwd}
                    placeholder="Пароль"
                    ref={userPwdRef}
                    disabled={!userPwdEdit}
                    onChange={e => setUserPwd(e.target.value)}
                    icon={userPwdEdit ? "CheckMarkIcon" : "EditIcon"}
                    onIconClick={toggleEditField.bind(this, originalValues.pwd, userPwdRef, userPwdEdit, setUserPwdEdit)}
                />
            </div>
{/*
            {updateState.error && <span className='text_type_main-small text_color_error mt-6'>{updateState.error}</span>}
*/}
            <div className={`pt-6`}>
                <Button htmlType="button" type="secondary" disabled={!canUpdate} onClick={cancelSave}>Отменить</Button>
                <Button htmlType="submit" disabled={!canUpdate}>Сохранить</Button>
            </div>
        </form>
    );
}

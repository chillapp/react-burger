import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import React, {FC, useCallback, useRef, useState} from "react";
import {updateUser} from "../../../services/actions/auth";
import {IResponseState, IStore, IUser} from "../../../services/store";
import {AnyAction} from "redux";

interface IExtRef extends React.RefObject<any>{
    originalValue: string
}

export const ProfileProfilePage: FC = () => {
    const dispatch = useDispatch();
    const user = useSelector<IStore>(store => store.auth.user) as IUser;

    const userNameRef = useRef<HTMLInputElement>(null) as IExtRef;
    userNameRef.originalValue = user.name;
    const [userName, setUserName] = useState<string>(user.name || '');
    const [userNameEdit, setUserNameEdit] = useState<boolean>(false);

    const userEmailRef = useRef<HTMLInputElement>(null) as IExtRef;
    userEmailRef.originalValue = user.email;
    const [userEmail, setUserEmail] = useState<string>(user.email || '');
    const [userEmailEdit, setUserEmailEdit] = useState<boolean>(false);

    const userPwdRef = useRef<HTMLInputElement>(null) as IExtRef;
    userPwdRef.originalValue = "";
    const [userPwd, setUserPwd] = useState<string>('');
    const [userPwdEdit, setUserPwdEdit] = useState<boolean>(false);

    const [canUpdate, setCanUpdate] = useState<boolean>(false);

    const toggleEditField = (ref: IExtRef, value: boolean, setter: Function) => {
        setter(!value);
        console.log(ref.current.value);
        if (!value) setTimeout(() => ref.current.focus());
        else if (ref.originalValue !== ref.current.value) {
            setCanUpdate(true);
        }
    }

    const saveUser = useCallback(() => {
        const payload: any = {};
        if (userPwd) payload.password = userPwd;
        if (userName !== user.name) payload.name = userName;
        if (userEmail !== user.email) payload.email = userEmail;
        dispatch(updateUser(payload) as AnyAction);
        setCanUpdate(false);
    }, [dispatch, userName, userPwd, userEmail])

    const cancelSave = useCallback(() => {
        setUserName(user.name);
        setUserNameEdit(false);

        setUserEmail(user.email);
        setUserEmailEdit(false);

        setUserPwd('');
        setUserPwdEdit(false);

        setCanUpdate(false);
    }, []);

    const updateState = useSelector<IStore>(store => store.auth.updateUser) as IResponseState;


    return (
        <section>
            <div>
                <Input
                    value={userName}
                    placeholder="Имя"
                    ref={userNameRef}
                    disabled={!userNameEdit}
                    onChange={e => setUserName(e.target.value)}
                    icon={userNameEdit ? "CheckMarkIcon" : "EditIcon"}
                    // @ts-ignore
                    onIconClick={toggleEditField.bind(this, userNameRef, userNameEdit, setUserNameEdit)}
                />
            </div>
            <div className={`pt-6`}>
                <Input
                    value={userEmail}
                    placeholder="Логин"
                    ref={userEmailRef}
                    disabled={!userEmailEdit}
                    onChange={e => setUserEmail(e.target.value)}
                    icon={userEmailEdit ? "CheckMarkIcon" : "EditIcon"}
                    // @ts-ignore
                    onIconClick={toggleEditField.bind(this, userEmailRef, userEmailEdit, setUserEmailEdit)}
                />
            </div>
            <div className={`pt-6`}>
                <Input
                    type="password"
                    value={userPwd}
                    placeholder="Пароль"
                    ref={userPwdRef}
                    disabled={!userPwdEdit}
                    onChange={e => setUserPwd(e.target.value)}
                    icon={userPwdEdit ? "CheckMarkIcon" : "EditIcon"}
                    // @ts-ignore
                    onIconClick={toggleEditField.bind(this, userPwdRef, userPwdEdit, setUserPwdEdit)}
                />
            </div>
            {updateState.error && <span className='text_type_main-small text_color_error mt-6'>{updateState.error}</span>}
            <div className={`pt-6`}>
                {/*@ts-ignore*/}
                <Button type="secondary" disabled={!canUpdate} onClick={cancelSave}>Отменить</Button>
                {/*@ts-ignore*/}
                <Button disabled={!canUpdate} onClick={saveUser}>Сохранить</Button>
            </div>
        </section>
    );
}

import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {FC, FormEvent, useCallback, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "../../../redux/hooks";
import {TUserUpdateRequest} from "../../../redux/types/user";
import {userUpdateThunk} from "../../../redux/actions/user";
import {useForm} from "../../../hooks/useForm";

interface IExtRef extends React.RefObject<any>{
    originalValue: string
}

export const ProfileProfilePage: FC = () => {
    const dispatch = useDispatch();
    const {
        user
    } = useSelector(store => store.user);

    const originalValues = {
        userName: user?.name || "",
        userEmail: user?.email || "",
        userPwd: "",
    }

    const {values, handleChange, setValues} = useForm(originalValues);

    const userNameRef = useRef<HTMLInputElement>(null) as IExtRef;
    const [userNameEdit, setUserNameEdit] = useState<boolean>(false);

    const userEmailRef = useRef<HTMLInputElement>(null) as IExtRef;
    const [userEmailEdit, setUserEmailEdit] = useState<boolean>(false);

    const userPwdRef = useRef<HTMLInputElement>(null) as IExtRef;
    const [userPwdEdit, setUserPwdEdit] = useState<boolean>(false);

    const [canUpdate, setCanUpdate] = useState<boolean>(false);

    useEffect(() => {
        if (
            values.userName !== originalValues.userName ||
            values.userEmail !== originalValues.userEmail ||
            values.userPwd !== originalValues.userPwd
        ) {
            setCanUpdate(true);
        } else setCanUpdate(false);
    }, [values, originalValues.userName, originalValues.userEmail, originalValues.userPwd])

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
        if (values.userPwd) payload.password = values.userPwd;
        if (values.userName !== user?.name) payload.name = values.userName;
        if (values.userEmail !== user?.email) payload.email = values.userEmail;
        dispatch(userUpdateThunk(payload));
        setCanUpdate(false);
        setUserNameEdit(false);
        setUserEmailEdit(false);
        setUserPwdEdit(false);
    }, [values, user?.name, user?.email, dispatch])

    const cancelSave = useCallback(() => {
        setUserNameEdit(false);
        setValues({...values, userName: user?.name || ""});

        setUserEmailEdit(false);
        setValues({...values, userEmail: user?.email || ""});

        setUserPwdEdit(false);
        setValues({...values, userPwd: ""});

        setCanUpdate(false);
    }, [user?.email, user?.name]);

    return (
        <form onSubmit={saveUser}>
            <div>
                <Input
                    name="userName"
                    value={values.userName || ""}
                    placeholder="Имя"
                    ref={userNameRef}
                    disabled={!userNameEdit}
                    onChange={handleChange}
                    icon={userNameEdit ? "CheckMarkIcon" : "EditIcon"}
                    onIconClick={toggleEditField.bind(this, originalValues.userName, userNameRef, userNameEdit, setUserNameEdit)}
                />
            </div>
            <div className={`pt-6`}>
                <Input
                    name="userEmail"
                    value={values.userEmail || ""}
                    placeholder="Логин"
                    ref={userEmailRef}
                    disabled={!userEmailEdit}
                    onChange={handleChange}
                    icon={userEmailEdit ? "CheckMarkIcon" : "EditIcon"}
                    onIconClick={toggleEditField.bind(this, originalValues.userEmail, userEmailRef, userEmailEdit, setUserEmailEdit)}
                />
            </div>
            <div className={`pt-6`}>
                <Input
                    name="userPwd"
                    type="password"
                    value={values.userPwd || ""}
                    placeholder="Пароль"
                    ref={userPwdRef}
                    disabled={!userPwdEdit}
                    onChange={handleChange}
                    icon={userPwdEdit ? "CheckMarkIcon" : "EditIcon"}
                    onIconClick={toggleEditField.bind(this, originalValues.userPwd, userPwdRef, userPwdEdit, setUserPwdEdit)}
                />
            </div>
            <div className={`pt-6`}>
                <Button htmlType="button" type="secondary" disabled={!canUpdate} onClick={cancelSave}>Отменить</Button>
                <Button htmlType="submit" disabled={!canUpdate}>Сохранить</Button>
            </div>
        </form>
    );
}

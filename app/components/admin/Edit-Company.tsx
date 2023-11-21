import * as React from "react";
import {ChangeEvent, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {HttpService} from "../../__services";
import {openSnackbar, storageService} from "../../__services";
import {v4 as uuidv4} from 'uuid';
import {REGEX} from "../../__constants";
import {CompanyInterface, ValidationInterface} from "../../interfaces";


export const EditCompany = () => {
    const [is_error, setError] = useState<boolean>(true);
    const [companyData, setCompanyData] = useState<CompanyInterface>();

    const router = useRouter();

    let {uuid} = router.query;
    uuid = typeof uuid === "string" && !!uuid ? storageService.returnHashStringValue(uuid) : '';

    const [formValues, setFormValues] = useState<Record<any, ValidationInterface>>({
        name: {
            value:  '' ,
            error: false,
            errorMessage: 'Name Must Contain More Than 3 Characters',
            validator: REGEX.TEXT
        },
        phone_number: {
            value:  '',
            error: false,
            errorMessage: 'Invalid Phone Number',
            validator: REGEX.PHONE_NUMBER
        },
        address: {
            value:  '',
            error: false,
            errorMessage: 'Champ est requi',
            validator: REGEX.TEXT
        },
        sector: {
            value:  '',
            error: false,
            errorMessage: 'Champ est requi',
            required: true
        },
        description: {
            value:  '',
            error: false,
            errorMessage: 'Briefly Description is required',
            required: true
        },
    });

    const handleChange = (e: any) => {
        e.preventDefault()
        let {name, value}: Record<any, string> = e.target;
        let targetProperty = formValues[name];

        let error = targetProperty?.validator ? !targetProperty.validator.test(value) : false;

        (targetProperty.required && !value.trim().length) && (error = true)

        setFormValues({
            ...formValues,
            [name]: {
                ...formValues[name],
                value,
                error
            }
        })
    }

    useEffect(() => {
        HttpService.httpService(`company/uuid/?${uuid}`, 'GET').then((res) => {
            if (res?.status && res.status >= 200 && res.status < 300) {
                setCompanyData(res?.data);
                let data = res?.data;
                setFormValues({
                    name: {
                        value:  data.name,
                        error: false,
                        errorMessage: 'Che champ est Invalid',
                        validator: REGEX.TEXT
                    },
                    phone_number: {
                        value:  data.phoneNumber,
                        error: false,
                        errorMessage: 'Numeros Incorrect',
                        validator: REGEX.PHONE_NUMBER
                    },
                    address: {
                        value:  data.address,
                        error: false,
                        errorMessage: 'Champ est requi',
                        validator: REGEX.TEXT
                    },
                    sector: {
                        value:  data.sectorOfActivity,
                        error: false,
                        errorMessage: 'Champ est requi',
                        required: true
                    },
                    description: {
                        value:  data.description,
                        error: false,
                        errorMessage: 'Champ est requi',
                        required: true
                    },
                })
            }
        })
    }, []);

    useEffect(() => {
        let x = Object.entries(formValues).find(([key, value]) => value.error || !value.value.length);
    // && image !== undefined
        if (x === undefined ) {
            setError(false)
        } else {
            setError(true)
        }
    }, [ formValues]);

    const onSubmit = () => {

        let values = {
            name: formValues.name.value,
            description: formValues.description.value,
            sectorOfActivity: formValues.sector.value,
            address: formValues.address.value,
            phoneNumber: formValues.phone_number.value,
        };
        HttpService.httpService(`company/edit/${companyData?.idCompany}`, 'PUT', values).then((res) => {
            if (!res?.response?.data?.error) {
                router.push('/admin/')

            }else {
                openSnackbar({
                    type: 'error',
                    message: res?.response?.data?.message ?? 'An Error occured! Please Try Again later.'
                })
            }
        })
    };

    return (
        <main>
            <hr/>
            <div className="difContainer">
                <div className="difBloc">
                    <div className="difHeadings">
                        <h2>Modifier les informations de l&#39;entreprise</h2>
                    </div>
                    <form action="" id="difRegister" method="post">
                        <div className="difFlex">
                            <fieldset>
                                <label htmlFor="difName">
                                    <span>Nom de l&#39;entreprise:</span>
                                    <input type="text" id="difName"
                                           value={formValues.name.value}
                                           onChange={handleChange}
                                           className="difName" name="name"
                                           placeholder="Enter your entreprise name" required/>
                                    <small
                                        className='error'>{formValues.name.error && formValues.name.errorMessage}</small>
                                </label>

                                <label htmlFor="difAddress">
                                    <span>Address</span>
                                    <input type="text" id="difAddress" className="difAddress"
                                           value={formValues.address.value}
                                           onChange={handleChange}
                                           name="address"
                                           placeholder="Enter your entreprise adress" required/>
                                    <small
                                        className='error'>{formValues.address.error && formValues.address.errorMessage}</small>
                                </label>

                                <label htmlFor="difSecteur">
                                    <span>Secteur d&#39;activité:</span>
                                    <select id="difSecteur" className="difSecteur"
                                            value={formValues.sector.value}
                                            onChange={handleChange}
                                            name="sector">
                                        <option value=''>Select a field</option>
                                        <option value='Agriculture'>Agriculture</option>
                                        <option value='Informatique'>Informatique</option>
                                        <option value='Banque/Finance'>Banque/Finance</option>
                                    </select>
                                    <small
                                        className='error'>{formValues.sector.error && formValues.sector.errorMessage}</small>
                                </label>
                            </fieldset>
                            <fieldset>
                                <label htmlFor="difAddress">
                                    <span>Phone</span>
                                    <input type="text" id="difAddress" className="difAddress"
                                           value={formValues.phone_number.value}
                                           onChange={handleChange}
                                           name="phone_number"
                                           placeholder="phone" required/>
                                    <small
                                        className='error'>{formValues.phone_number.error && formValues.phone_number.errorMessage}</small>
                                </label>

                                <label htmlFor="difDescription">
                                    <span>Description:</span>
                                    <textarea id="difDescription"
                                              value={formValues.description.value}
                                              onChange={handleChange}
                                              className="difDescription"
                                              name="description" required></textarea>
                                    <small
                                        className='error'>{formValues.description.error && formValues.description.errorMessage}</small>
                                </label>
                                {/*<label className="difBtn" id="difScannerOpen">*/}
                                {/*    <span>*/}
                                {/*        <i className="fa-solid fa-camera"></i>*/}
                                {/*        Logo de l&#39;entreprise*/}
                                {/*    </span>*/}
                                {/*    <input type="file" id="difLogo" className="difLogo" name="logo"*/}
                                {/*           accept="image/*;capture=camera" onChange={handleImage}/>*/}
                                {/*    <small>{image && image.item(0).name}</small>*/}
                                {/*</label>*/}
                            </fieldset>
                        </div>

                    </form>
                    <button disabled={is_error} onClick={onSubmit} className="difBtn difBtnGreen"
                            style={is_error ? {cursor: 'not-allowed', background: '#bbb'} : {cursor: 'pointer'}}>
                        Continue
                    </button>
                </div>
            </div>
        </main>
    )
}

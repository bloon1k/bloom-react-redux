import React, {useState} from 'react'
// Styles
import './CreatePost.scss'
// Libraries
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {useDispatch, useSelector} from 'react-redux'
import {occurredMissingImageError} from '../../redux/features/errorsSlice'

const schema = yup.object().shape({
    description: yup.string().min(4, 'At least 4 characters').max(200, 'No longer than 200 characters').required()
})

const CreatePost = () => {

    const {register, handleSubmit, formState: {errors}, reset} = useForm({
        resolver: yupResolver(schema)
    })
    const dispatch = useDispatch()
    const missingImageError = useSelector(state => state.errors.missingImageError)

    const [value, setValue] = useState('')
    const [isFile, setIsFile] = useState(false)

    function submitCreatePost() {
        occurredMissingImageError('')
        if (isFile) {
            console.log('sdf')
            reset()
        } else {
            dispatch(occurredMissingImageError('Image is required'))
        }
    }

    return (
        <section className={'create-post'} onSubmit={handleSubmit(submitCreatePost)}>
            <span>Create post form</span>
            <form className={'create-post__form'}>

                <div className="create-post__upper">

                    <div className="create-post__label-wrapper">
                        <label htmlFor={'create-post__image-input'} className={'create-post__label'}>
                            <span>Choose post image</span>
                            <input
                                type="file"
                                name="create-post__image-input"
                                id="create-post__image-input"
                                accept={'image/*'}
                                onChange={() => {
                                    const [file] = document.getElementById('create-post__image-input').files
                                    if (file) {
                                        document.getElementById('create-post__image').style.opacity = 1
                                        document.getElementById('create-post__image').src = URL.createObjectURL(file)
                                        setIsFile(true)
                                    }
                                }}
                            />
                            {missingImageError && <p className={'create-post__image-error'}>{missingImageError}</p>}
                        </label>
                        <img
                            src=""
                            alt="selected post img"
                            id={'create-post__image'}
                            className={'create-post__image'}
                            style={{opacity: '0'}}
                        />
                    </div>


                    <div className="create-post__upper-right">
                        <div className="create-post__input-wrapper">

                            <input
                                type="text"
                                name="create-post__description"
                                id="create-post__description"
                                className={'create-post__input'}
                                onFocus={() => document.getElementsByClassName('create-post__placeholder')[0].classList.add('create-post__placeholder-move')}
                                {...register('description')}
                                value={value}
                                onChange={e => [...e.target.value].length > 200 ? 1 : setValue(e.target.value)}
                            />
                            {errors.description && <p className={'create-post__error'}>{errors.description.message}</p>}
                            <span
                                className="create-post__placeholder"
                                onClick={() => document.getElementById('create-post__description').focus()}
                            >
                            Description (4-200 characters)
                        </span>

                        </div>
                        <div className="create-post__text">
                            {value}
                        </div>
                    </div>

                </div>

                <button className={'create-post__button'} type={'submit'}>Create post</button>
            </form>
        </section>
    )
}

export default CreatePost
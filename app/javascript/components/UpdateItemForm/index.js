import React, {useState} from 'react'
import cs from './styles';
import {Mutation, useMutation} from 'react-apollo'
import {UpdateItemMutation} from './operations.graphql'
import ProcessItemForm from '../ProcessItemForm'

const UpdateItemForm = ({ id, initialTitle, initialDescription, initialImageUrl, onClose }) => {
    const [updateItem, {loading}] = useMutation(UpdateItemMutation)
    const [errors, setErrors] = useState(null)

    const onProcessItem = ({title, description, imageUrl}) => {
        updateItem({
            variables: {
                id,
                title,
                description,
                imageUrl
            },
            // todo: figure out how to both have an optimistic response and working error handling
            optimisticResponse: {
                __typename: 'Mutation',
                updateItem: {
                    __typename: 'UpdateItemMutationPayload',
                    item: {
                        id,
                        __typename: 'Item',
                        title,
                        description,
                        imageUrl
                    },
                    errors
                }
            }
        }).then(({data}) => {
            if(data && data.updateItem.errors) {
                setErrors(data.updateItem.errors)
                return
            }
            onClose()
        })
    }

    return <div className={cs.overlay}>
        <div className={cs.content}>
            <ProcessItemForm
                initialImageUrl={initialImageUrl}
                initialTitle={initialTitle}
                initialDescription={initialDescription}
                buttonText="Update Item"
                loading={loading}
                onProcessItem={onProcessItem}
                errors={errors}
            />
            <button className={cs.close} onClick={onClose}>Close</button>
        </div>
    </div>
}

export default UpdateItemForm;

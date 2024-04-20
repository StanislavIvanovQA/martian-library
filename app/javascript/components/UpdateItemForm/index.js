import React, {useState} from 'react'
import cs from './styles';
import {Mutation} from 'react-apollo'
import {UpdateItemMutation} from './operations.graphql'
import ProcessItemForm from '../ProcessItemForm'

const UpdateItemForm = ({ id, initialTitle, initialDescription, initialImageUrl, onClose }) => {
    const [errors, setErrors] = useState(null)

    const onProcessItemCurry = (updateItem) => ({title, description, imageUrl}) => {
        updateItem({
            variables: {
                id,
                title,
                description,
                imageUrl
            },
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
                    }
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
            <Mutation mutation={UpdateItemMutation}>
                {(updateItem, {loading, data}) => (
                    <ProcessItemForm
                        initialImageUrl={initialImageUrl}
                        initialTitle={initialTitle}
                        initialDescription={initialDescription}
                        buttonText="Update Item"
                        loading={loading}
                        onProcessItem={onProcessItemCurry(updateItem)}
                        errors={errors}
                    ></ProcessItemForm>
                )}
            </Mutation>
            <button className={cs.close} onClick={onClose}>Close</button>
        </div>
    </div>
}

export default UpdateItemForm;

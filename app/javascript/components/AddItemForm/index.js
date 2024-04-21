import React from 'react'
import {useMutation} from 'react-apollo'
import ProcessItemForm from '../ProcessItemForm'
import {AddItemMutation} from './operations.graphql'
import {LibraryQuery} from '../Library/operations.graphql'

const AddItemForm = () => {
    const [addItem, {loading, data, error}] = useMutation(AddItemMutation)
    const onProcessItem = ({title, description, imageUrl}) => addItem({
        variables: {
            title,
            description,
            imageUrl,
        },
        update: (cache, {data: {addItem}}) => {
            const item = addItem.item
            if (item) {
                const currentItems = cache.readQuery({query: LibraryQuery})
                cache.writeQuery({
                    query: LibraryQuery,
                    data: {
                        items: currentItems.items.concat([item]),
                    }
                })
            }
        }
    })

    const errors = [...(data?.addItem?.errors?.fullMessages ?? []), error].filter(e=>e)

    return <ProcessItemForm
        buttonText="Add Item"
        loading={loading}
        errors={errors.length === 0 ? undefined : {fullMessages: errors}}
        onProcessItem={onProcessItem}
    />
}

export default AddItemForm

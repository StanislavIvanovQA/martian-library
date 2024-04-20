import React from 'react'
import {Mutation} from 'react-apollo'
import ProcessItemForm from '../ProcessItemForm'
import {AddItemMutation} from './operations.graphql'
import {LibraryQuery} from '../Library/operations.graphql'

const AddItemForm = () => {
    return <Mutation mutation={AddItemMutation}>
        {(addItem, {loading, data}) => (
            <ProcessItemForm
                buttonText="Add Item"
                loading={loading}
                errors={data && data.addItem.errors}
                onProcessItem={({title, description, imageUrl}) =>  addItem({
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
                                    },
                                })
                            }
                        }
                    })
                }
            />
        )}
    </Mutation>
}

export default AddItemForm

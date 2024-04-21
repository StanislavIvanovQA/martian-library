import React, {useState} from 'react'
import cs from './styles'
import {useQuery} from 'react-apollo'
import {LibraryQuery} from './operations.graphql'
import UpdateItemForm from '../UpdateItemForm'
import Subscription from '../Subscription'

const Library = () => {
    const [item, setItem] = useState(null)
    const {data, loading, subscribeToMore} = useQuery(LibraryQuery)

    const UpdateForm = () => <UpdateItemForm
        id={item.id}
        initialTitle={item.title}
        initialDescription={item.description}
        initialImageUrl={item.imageUrl}
        onClose={() => setItem(null)}
    />

    const LibraryItems = () => data.items.map(({title, id, user, imageUrl, description}) => {
        return <button
            key={id}
            className={cs.plate}
            onClick={() => setItem({title, imageUrl, id, description})}
        >
            <div className={cs.title}>{title}</div>
            <div>{description}</div>
            {imageUrl && <img src={imageUrl} className={cs.image}/>}
            {user
                ? <div className={cs.user}>added by {user.email}</div>
                : null
            }
        </button>
    })

    return (
        <>
            <div className={cs.library}>
                {loading || !data.items
                    ? 'loading...'
                    : <LibraryItems/>
                }
                <Subscription subscribeToMore={subscribeToMore}/>
            </div>
            {item && <UpdateForm/>}
        </>
    )
}

export default Library

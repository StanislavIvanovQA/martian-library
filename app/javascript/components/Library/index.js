import React, {useState} from 'react'
import cs from './styles'
import {Query} from 'react-apollo'
import {LibraryQuery} from './operations.graphql'
import UpdateItemForm from '../UpdateItemForm'

const Library = () => {
    const [item, setItem] = useState(null)

    const UpdateForm = () => <UpdateItemForm
        id={item.id}
        initialTitle={item.title}
        initialDescription={item.description}
        initialImageUrl={item.imageUrl}
        onClose={() => setItem(null)}
    />

    const LibraryItems = ({data}) => data.items.map(({title, id, user, imageUrl, description}) => {
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
        <Query query={LibraryQuery}>
            {({data, loading}) => (
                <>
                    <div className={cs.library}>
                        {loading || !data.items
                            ? 'loading...'
                            : <LibraryItems data={data}/>
                        }
                    </div>
                    {item && <UpdateForm/>}
                </>
            )}
        </Query>
    )
}

export default Library

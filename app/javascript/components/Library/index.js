import React from 'react'
import {Query} from 'react-apollo'
import {LibraryQuery} from './operations.graphql'

export default () => (
    <Query query={LibraryQuery}>
        {({data, loading}) => (
            <div>
                {loading
                    ? 'loading...'
                    : data.items.map(({title, id, user}) => (
                        <div key={id}>
                            <b>{title}</b> {user ? `added by ${user.email}` : null}
                        </div>
                    ))}
            </div>
        )}
    </Query>
)

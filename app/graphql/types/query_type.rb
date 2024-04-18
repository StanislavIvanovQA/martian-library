module Types
  class QueryType < Types::BaseObject
    field :items, [Types::ItemType],
          null: false,
          description: "Returns a list of items in the martial library"
    field :me, Types::UserType, null: true
    field :users, [Types::UserType]

    def items
      Item.all
    end

    def me
      context[:current_user]
    end

    def users
      User.all
    end
  end
end

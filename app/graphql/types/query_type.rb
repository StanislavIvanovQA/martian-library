module Types
  class QueryType < Types::BaseObject
    field :items, [Types::ItemType],
          null: false,
          description: "Returns a list of items in the martial library"

    def items
      Item.all
    end

    field :me, Types::UserType, null: true

    def me
      context[:current_user]
    end

    field :users, [Types::UserType]

    def users
      User.all
    end
  end
end

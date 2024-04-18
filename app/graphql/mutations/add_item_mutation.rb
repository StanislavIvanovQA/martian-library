module Mutations
  class AddItemMutation < Mutations::BaseMutation
    argument :title, String, required: true
    argument :description, String, required: false
    argument :image_url, String, required: false

    field :item, Types::ItemType, null: false
    field :errors, [String], null: false

    def resolve(title:, description: nil, image_url: nil)
      check_authentication!

      item = Item.new title:, description:, image_url:, user: context[:current_user]

      if item.save
        {item:}
      else
        {errors: item.errors.full_messages}
      end
    end
  end
end

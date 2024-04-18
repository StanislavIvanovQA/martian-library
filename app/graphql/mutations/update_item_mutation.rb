module Mutations
  class UpdateItemMutation < Mutations::BaseMutation
    argument :id, ID, required: true
    argument :title, String, required: true
    argument :description, String, required: false
    argument :image_url, String, required: false

    field :item, Types::ItemType, null: true
    field :errors, [String], null: false

    def resolve(id:, title:, description: nil, image_url: nil)
      check_authentication!

      item = Item.find id

      if item.update(title:, description:, image_url:)
        {item:}
      else
        {errors: item.errors.full_messages}
      end
    end
  end
end

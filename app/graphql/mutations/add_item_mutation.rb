module Mutations
  class AddItemMutation < Mutations::BaseMutation
    argument :title, String, required: true
    argument :description, String, required: false
    argument :image_url, String, required: false

    field :item, Types::ItemType, null: true
    field :errors, Types::ValidationErrorsType, null: true

    def resolve(title:, description: nil, image_url: nil)
      check_authentication!

      item = Item.new(title:, description:, image_url:, user: context[:current_user])

      if item.save
        {item:}
      else
        {errors: item.errors}
      end
    end
  end
end

module Mutations
  class UpdateItemMutation < Mutations::BaseMutation
    argument :id, ID, required: true
    argument :attributes, Types::ItemAttributes, required: true

    field :item, Types::ItemType, null: true
    field :errors, Types::ValidationErrorsType, null: true

    def resolve(attributes:, id:)
      check_authentication!

      item = Item.find id

      if item.update(attributes.to_h)
        MartianLibrarySchema.subscriptions.trigger("itemUpdated", {}, item)
        {item:}
      else
        {errors: item.errors}
      end
    end
  end
end

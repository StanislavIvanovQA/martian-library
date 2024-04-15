# frozen_string_literal: true

module Types
  class ItemType < Types::BaseObject
    field :id, ID, null: false
    field :title, String
    field :description, String, null: true
    field :image_url, String, null: true
    field :user, Types::UserType, null: false
  end
end

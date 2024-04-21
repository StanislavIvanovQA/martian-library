class GraphqlChannel < ApplicationCable::Channel
  def subscribed
    @subscription_ids = []
  end

  def execute(data)
    result = execute_query data

    payload = {
      result: result.subscription ? {data: nil} : result.to_h,
      more: result.subscription?
    }

    @subscription_ids << context[:subscribtion_id] if result.context[:subscribtion_id]

    transmit(payload)
  end

  def unsubscribed
    @subscription_ids.each { |sid| MartianLibrarySchema.subscriptions.delete_subscription sid }
  end

  private

  def execute_query(data)
    MartianLibrarySchema.execute(
      query: data["query"],
      context: context,
      variables: data["variables"],
      operation_name: data["operationName"]
    )
  end

  def context
    {
      current_user_id: current_user&.id,
      current_user: current_user,
      channel: self
    }
  end
end

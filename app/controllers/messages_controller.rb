class MessagesController < ApplicationController
  before_action :set_group
  
  def index
    @message = Message.new
    @message = @group.message.includes(:user)
  end

  def create
    @message = @group.message.new(message_params)
      if @message.save
        redirect_to group_message_path(@group), notice: 'メッセージを送信しました。'
      else
        @messages = @group.message.includes(:user)
        flash.now[:alert] = 'メッセージを入力してください。'
        render :index
      end
  end

  private
  def message_params
    marams.require(:message).permit(:content, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end

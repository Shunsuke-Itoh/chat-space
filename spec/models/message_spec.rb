require 'rails_helper'
describe Message do
  describe '#create' do
    context 'can save' do
      it "is valid with message_content" do
        message = build(:message, image: "")
        expect(message).to be_valid
      end

      it "is valid with message_image" do
        message = build(:message, content: "")
        expect(message).to be_valid
      end

      it "is valid with message_content and _image" do
        message = build(:message)
        expect(message).to be_valid
      end

      it "is invalid without message_content and _image" do
        message = build(:message, content: "", image: "")
        message.valid?
        expect(message.errors[:content]).to include("を入力してください")
      end
    end

    context 'cannot save' do

      it "is invalid without group_id" do
        message = build(:message, group_id: "")
        message.valid?
        expect(message.errors[:group]).to include("を入力してください")
      end

      it "is invalid without user_id" do
        message = build(:message, user_id: "")
        message.valid?
        expect(message.errors[:user]).to include("を入力してください")
      end
    end
  end
end
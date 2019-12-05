require 'rails_helper'

  describe MessagesController do
    let(:user) {create(:user)}
    let(:group) {create(:group)}

    describe '#index' do
      context 'when user log_in' do
        before do
          login user
          get :index, params: {group_id: group.id}
        end

        it "is assigns the requested message to @message" do
          expect(assigns(:message)).to be_a_new(Message)
        end

        it "is assigns the requested message to @group" do
          expect(assigns(:group)).to eq group
        end

        it "render the :index template" do
          expect(response).to render_template :index
        end
      end

      context 'when user not log_in' do
        before do
          get :index, params: { group_id: group.id }
        end

        it "redirect to new_user_session_path" do
          expect(response).to redirect_to(new_user_session_path)
        end
      end
    end

    describe '#create' do
      let(:params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message) } }
        
      context "log_in" do
        before do
          login user
        end

        context "success save" do
          subject {
            post :create,
            params: params
          }

          it "saves in Database" do
            expect { subject }.to change(Message, :count).by(1)
          end

          it "redirect to group_messages_path(@group)" do
            subject
            expect(response).to redirect_to(group_messages_path(group))
          end
        end

        context "unsuccess save" do
          let(:invalid_params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message, content: nil, image: nil) } }

          subject {
            post :create,
            params: invalid_params
          }
            
          it "doesn`t save in Databese" do
            expect{ subject }.not_to change(Message, :count)
          end

          it "renders index" do
            subject
            expect(response).to render_template :index
          end
        end
      end

      context " not log in" do
        
        it "redirect to new_user_session_path" do
          post :create, params: params
          expect(response).to redirect_to(new_user_session_path)
        end

      end
    end
  end
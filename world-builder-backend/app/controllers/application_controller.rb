class ApplicationController < ActionController::API

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def current_profile
    current_user.profile
  end

  def logged_in?
    !!current_user
  end

end
  

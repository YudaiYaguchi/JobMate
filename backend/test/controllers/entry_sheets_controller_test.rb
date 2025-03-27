require "test_helper"

class EntrySheetsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get entry_sheets_index_url
    assert_response :success
  end

  test "should get show" do
    get entry_sheets_show_url
    assert_response :success
  end

  test "should get new" do
    get entry_sheets_new_url
    assert_response :success
  end

  test "should get create" do
    get entry_sheets_create_url
    assert_response :success
  end

  test "should get edit" do
    get entry_sheets_edit_url
    assert_response :success
  end

  test "should get update" do
    get entry_sheets_update_url
    assert_response :success
  end

  test "should get destroy" do
    get entry_sheets_destroy_url
    assert_response :success
  end
end

class Company
  include Mongoid::Document
  field :name, type: String
  field :address, type: String
  field :phone, type: String

  def self.search(search)
    if search.blank?
      all
    else
      where("this.name.match(/#{search}/i)")
    end
  end
end

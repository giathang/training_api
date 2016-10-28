class Company
  include Mongoid::Document
  field :name, type: String
  field :address, type: String
  field :phone, type: String


  def self.search(search)
    unless search.empty?
      self.where(name: search)
    else
      self.all
    end
  end
end

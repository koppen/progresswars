require 'ostruct'
class Task < OpenStruct

  def initialize(cookies = {})
    super()

    self.values = cookies

    self.name = values[:name] || self.random_name
    self.clicks = (values[:clicks] || 0).to_i
    self.level = (values[:level] || 1).to_i
    self.experience = (values[:experience] || 0).to_i

    self.clicks_to_complete = (values[:clicks_to_complete] || self.level + 1).to_i
    self.experience_for_next_level = (values[:experience_for_next_level] || calculate_experience_for_next_level).to_i
  end

  def calculate_experience_for_next_level
    ((self.level + 1) ** 2).ceil
  end

  def task_progress
    (100.0 * self.clicks / self.clicks_to_complete).round
  end

  def level_progress
    (100.0 * self.experience / self.experience_for_next_level).round
  end

  def random_name
    verbs = ['ambush', 'collect', 'fish for', 'grow', 'harvest', 'hijack', 'plunder', 'raid', 'repel', 'sell', 'hijack', 'steal', 'chase away', 'rob', 'rough up']
    nouns = ['a drug runner', 'chinese merchant ships', 'dealers', 'eggplant', 'silk traders', 'soy beans', 'the Yakuza', 'guns', 'a semi', 'a tanker truck', 'thugs', 'your family', 'protection money', 'the warehouse']

    phrase = []
    phrase << verbs.rand
    phrase << nouns.rand
    phrase.join(' ').titlecase
  end

end
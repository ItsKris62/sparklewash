// Backend controller logic
exports.updateUserProfile = async (req, res) => {
    const { firstName, lastName, contact, countryCode } = req.body;
    const userId = req.user.id;
  
    try {
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.firstName = firstName;
      user.lastName = lastName;
      user.contact = contact;
      user.countryCode = countryCode;
  
      const updatedUser = await user.save();
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  
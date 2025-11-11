let campaigns = [
  {
    id: 1,
    title: "Soutenez les jeunes auteurs",
    description: "Aidez-nous à publier les œuvres de nouveaux talents littéraires",
    goal_amount: 5000,
    current_amount: 1250,
    donors_count: 23,
    image_url: "/uploads/images/campaign-authors.jpg",
    organizer_id: 1,
    end_date: "2024-12-31",
    created_at: new Date().toISOString()
  }
];

let donations = [];

// Récupérer toutes les campagnes
exports.getCampaigns = (req, res) => {
  try {
    res.json({
      success: true,
      campaigns: campaigns.filter(c => new Date(c.end_date) > new Date())
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Erreur lors de la récupération des campagnes' 
    });
  }
};

// Créer une campagne
exports.createCampaign = (req, res) => {
  try {
    const { title, description, goal_amount, image_url, end_date } = req.body;
    
    const campaign = {
      id: campaigns.length + 1,
      title,
      description,
      goal_amount,
      current_amount: 0,
      donors_count: 0,
      image_url,
      organizer_id: req.user.id,
      end_date,
      created_at: new Date().toISOString()
    };

    campaigns.push(campaign);

    res.status(201).json({
      success: true,
      campaign
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Erreur lors de la création de la campagne' 
    });
  }
};

// Faire un don
exports.makeDonation = (req, res) => {
  try {
    const { campaign_id, amount, message } = req.body;
    
    const campaign = campaigns.find(c => c.id === campaign_id);
    if (!campaign) {
      return res.status(404).json({ 
        success: false, 
        error: 'Campagne non trouvée' 
      });
    }

    if (new Date(campaign.end_date) < new Date()) {
      return res.status(400).json({ 
        success: false, 
        error: 'La campagne est terminée' 
      });
    }

    const donation = {
      id: donations.length + 1,
      campaign_id,
      amount,
      message,
      donor_id: req.user.id,
      donor_name: req.user.name,
      created_at: new Date().toISOString()
    };

    // Mettre à jour la campagne
    campaign.current_amount += amount;
    campaign.donors_count += 1;

    donations.push(donation);

    res.status(201).json({
      success: true,
      donation,
      campaign
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Erreur lors du traitement du don' 
    });
  }
};
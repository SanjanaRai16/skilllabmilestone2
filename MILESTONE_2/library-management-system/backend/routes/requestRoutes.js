const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');
const { 
  adminMiddleware, 
  studentMiddleware 
} = require('../middleware/authMiddleware');
const { 
  validateBookRequest, 
  validateRequestStatusUpdate 
} = require('../middleware/requestvalidationMiddleware');

// Student can create request
router.post(
  '/create', 
  studentMiddleware,  // Ensure only students can create requests
  validateBookRequest,  // Validate request body
  requestController.createRequest
);

// Student can view own requests
router.get(
  '/my-requests', 
  studentMiddleware,  // Ensure only students can view their requests
  requestController.getUserRequests
);

// Admin-only routes for request management
router.put(
  '/:requestId/status', 
  adminMiddleware,  // Ensure only admin can update request status
  validateRequestStatusUpdate,  // Validate request status update
  requestController.updateRequestStatus
);

router.post(
  '/process-pending', 
  adminMiddleware,  // Ensure only admin can process pending requests
  requestController.processPendingRequests
);

module.exports = router;

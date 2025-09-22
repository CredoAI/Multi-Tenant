// src/components/pages/RequestRoutePage/RequestRoutePage.tsx
import React, { useState } from 'react';
import { 
  FiCheck, 
  FiX, 
  FiClock, 
  FiChevronDown,
  FiChevronUp,
  FiFilter,
  FiSearch
} from 'react-icons/fi';
import Button from '../../components/atoms/Button/Button';


// Define types based on your interface
const RequestStatus = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected'
}

const RelatedEntityType = {
  PRODUCT: 'product',
  ORDER :'order',
  USER :'user',
  ORGANIZATION: 'organization',
  INVENTORY: 'inventory'
}

interface Request {
  id: string;
  organizationId: string;
  requesterUserId: string;
  title: string;
  description: string;
  status:  any;
  data: object;
  requestType: any;
  approvedByUserId: string | null;
  approvalNotes: string | null;
  approvedAt: Date | null;
  rejectedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// Mock data based on your interface
const mockRequests: Request[] = [
  {
    id: 'req-001',
    organizationId: 'org-001',
    requesterUserId: 'user-001',
    title: 'New Product Approval',
    description: 'Request to add a new product to the catalog',
    status: RequestStatus.PENDING,
    data: {
      productName: 'Wireless Headphones',
      category: 'Electronics',
      price: 79.99,
      description: 'High-quality wireless headphones with noise cancellation'
    },
    requestType: RelatedEntityType.PRODUCT,
    approvedByUserId: null,
    approvalNotes: null,
    approvedAt: null,
    rejectedAt: null,
    createdAt: new Date('2023-05-15T10:30:00Z'),
    updatedAt: new Date('2023-05-15T10:30:00Z')
  },
  {
    id: 'req-002',
    organizationId: 'org-001',
    requesterUserId: 'user-002',
    title: 'Inventory Restock',
    description: 'Request to restock inventory for product XYZ',
    status: RequestStatus.APPROVED,
    data: {
      productId: 'prod-123',
      currentStock: 15,
      requestedStock: 100,
      supplier: 'Tech Supplies Inc.'
    },
    requestType: RelatedEntityType.INVENTORY,
    approvedByUserId: 'admin-001',
    approvalNotes: 'Approved as per inventory policy',
    approvedAt: new Date('2023-05-16T14:22:00Z'),
    rejectedAt: null,
    createdAt: new Date('2023-05-14T09:15:00Z'),
    updatedAt: new Date('2023-05-16T14:22:00Z')
  },
  {
    id: 'req-003',
    organizationId: 'org-002',
    requesterUserId: 'user-005',
    title: 'User Permission Change',
    description: 'Request to change user permissions for customer support',
    status: RequestStatus.REJECTED,
    data: {
      userId: 'user-789',
      currentRole: 'support',
      requestedRole: 'support-manager',
      reason: 'Team lead promotion'
    },
    requestType: RelatedEntityType.USER,
    approvedByUserId: null,
    approvalNotes: 'Insufficient tenure for promotion',
    approvedAt: null,
    rejectedAt: new Date('2023-05-17T16:45:00Z'),
    createdAt: new Date('2023-05-12T11:20:00Z'),
    updatedAt: new Date('2023-05-17T16:45:00Z')
  },
  {
    id: 'req-004',
    organizationId: 'org-001',
    requesterUserId: 'user-003',
    title: 'Discount Approval',
    description: 'Request to approve special discount for bulk order',
    status: RequestStatus.PENDING,
    data: {
      orderId: 'ord-456',
      customer: 'ABC Corporation',
      currentTotal: 2450.00,
      requestedDiscount: 15,
      discountedTotal: 2082.50
    },
    requestType: RelatedEntityType.ORDER,
    approvedByUserId: null,
    approvalNotes: null,
    approvedAt: null,
    rejectedAt: null,
    createdAt: new Date('2023-05-18T09:45:00Z'),
    updatedAt: new Date('2023-05-18T09:45:00Z')
  }
];

const RequestRoutePage: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>(mockRequests);
  const [expandedRequest, setExpandedRequest] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<any | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleApprove = (requestId: string) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId 
        ? { 
            ...req, 
            status: RequestStatus.APPROVED,
            approvedAt: new Date(),
            approvedByUserId: 'current-user-id',
            approvalNotes: 'Request approved'
          } 
        : req
    ));
  };

  const handleReject = (requestId: string) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId 
        ? { 
            ...req, 
            status: RequestStatus.REJECTED,
            rejectedAt: new Date(),
            approvalNotes: 'Request rejected'
          } 
        : req
    ));
  };

  const toggleExpand = (requestId: string) => {
    setExpandedRequest(expandedRequest === requestId ? null : requestId);
  };

  const filteredRequests = requests.filter(request => {
    const matchesStatus = filterStatus === 'all' || request.status === filterStatus;
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          request.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: any) => {
    switch (status) {
      case RequestStatus.PENDING:
        return 'bg-yellow-100 text-yellow-800';
      case RequestStatus.APPROVED:
        return 'bg-green-100 text-green-800';
      case RequestStatus.REJECTED:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-neutral-100 text-neutral-800';
    }
  };

  const getStatusIcon = (status: any) => {
    switch (status) {
      case RequestStatus.PENDING:
        return <FiClock className="mr-1" />;
      case RequestStatus.APPROVED:
        return <FiCheck className="mr-1" />;
      case RequestStatus.REJECTED:
        return <FiX className="mr-1" />;
      default:
        return null;
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-neutral-900">Request Management</h2>
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-neutral-400" />
            </div>
            <input
              type="text"
              placeholder="Search requests..."
              className="pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Filter */}
          <div className="flex items-center space-x-2">
            <FiFilter className="text-neutral-500" />
            <select
              className="border border-neutral-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any | 'all')}
            >
              <option value="all">All Statuses</option>
              <option value={RequestStatus.PENDING}>Pending</option>
              <option value={RequestStatus.APPROVED}>Approved</option>
              <option value={RequestStatus.REJECTED}>Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Requests List */}
      <div className="bg-white rounded-lg shadow-medium overflow-hidden">
        {filteredRequests.length === 0 ? (
          <div className="p-8 text-center text-neutral-500">
            No requests found matching your criteria.
          </div>
        ) : (
          <div className="divide-y divide-neutral-200">
            {filteredRequests.map((request) => (
              <div key={request.id} className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-neutral-900">{request.title}</h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                        {getStatusIcon(request.status)}
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-neutral-600 mb-4">{request.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-neutral-500">
                      <span>Type: {request.requestType}</span>
                      <span>Created: {formatDate(request.createdAt)}</span>
                      {request.approvedAt && <span>Approved: {formatDate(request.approvedAt)}</span>}
                      {request.rejectedAt && <span>Rejected: {formatDate(request.rejectedAt)}</span>}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {request.status === RequestStatus.PENDING && (
                      <>
                        <Button
                          variant="outline"
                        //   size="sm"
                          onClick={() => handleReject(request.id)}
                          className="text-error hover:bg-error-50"
                        >
                          <FiX className="mr-1" />
                          Reject
                        </Button>
                        <Button
                        //   size="sm"
                          onClick={() => handleApprove(request.id)}
                        >
                          <FiCheck className="mr-1" />
                          Approve
                        </Button>
                      </>
                    )}
                    <Button
                      variant="outline"
                    //   size="sm"
                      onClick={() => toggleExpand(request.id)}
                    >
                      {expandedRequest === request.id ? (
                        <FiChevronUp className="mr-1" />
                      ) : (
                        <FiChevronDown className="mr-1" />
                      )}
                      Details
                    </Button>
                  </div>
                </div>
                
                {/* Expanded Details */}
                {expandedRequest === request.id && (
                  <div className="mt-4 pt-4 border-t border-neutral-200">
                    <h4 className="font-medium text-neutral-800 mb-3">Request Details</h4>
                    
                    {/* Data Field Values */}
                    <div className="bg-neutral-50 rounded-lg p-4 mb-4">
                      <pre className="text-sm text-neutral-700 overflow-x-auto">
                        {JSON.stringify(request.data, null, 2)}
                      </pre>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-neutral-700 mb-2">Approval Information</h5>
                        <div className="space-y-1 text-sm">
                          <p><span className="text-neutral-500">Approved By:</span> {request.approvedByUserId || 'N/A'}</p>
                          <p><span className="text-neutral-500">Approval Notes:</span> {request.approvalNotes || 'N/A'}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-neutral-700 mb-2">Timestamps</h5>
                        <div className="space-y-1 text-sm">
                          <p><span className="text-neutral-500">Created:</span> {formatDate(request.createdAt)}</p>
                          <p><span className="text-neutral-500">Updated:</span> {formatDate(request.updatedAt)}</p>
                          {request.approvedAt && <p><span className="text-neutral-500">Approved:</span> {formatDate(request.approvedAt)}</p>}
                          {request.rejectedAt && <p><span className="text-neutral-500">Rejected:</span> {formatDate(request.rejectedAt)}</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestRoutePage;
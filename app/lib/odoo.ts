import axios from 'axios';

const ODOO_URL = process.env.ODOO_URL || 'https://your-odoo-instance.com';
const ODOO_DATABASE = process.env.ODOO_DATABASE || '';
const ODOO_USERNAME = process.env.ODOO_USERNAME || '';
const ODOO_PASSWORD = process.env.ODOO_PASSWORD || '';

interface OdooTask {
  id: number;
  name: string;
  description?: string;
  state?: string;
  user_id?: number[];
  date_deadline?: string;
  priority?: string;
}

class OdooClient {
  private sessionId: string | null = null;
  private uid: number | null = null;

  async authenticate(): Promise<boolean> {
    try {
      const response = await axios.post(`${ODOO_URL}/web/session/authenticate`, {
        jsonrpc: '2.0',
        method: 'call',
        params: {
          db: ODOO_DATABASE,
          login: ODOO_USERNAME,
          password: ODOO_PASSWORD,
        },
        id: 1,
      });

      if (response.data.result) {
        this.uid = response.data.result.uid;
        this.sessionId = response.headers['set-cookie']?.[0] || null;
        return true;
      }
      return false;
    } catch (error) {
      console.error('Odoo authentication failed:', error);
      return false;
    }
  }

  async getTasks(userId?: number): Promise<OdooTask[]> {
    try {
      if (!this.uid) await this.authenticate();

      const filters = userId ? [['user_id', '=', userId]] : [];

      const response = await axios.post(`${ODOO_URL}/web/dataset/call_kw/project.task/search_read`, {
        jsonrpc: '2.0',
        method: 'call',
        params: {
          model: 'project.task',
          method: 'search_read',
          args: [filters],
          kwargs: {
            fields: ['id', 'name', 'description', 'state', 'user_id', 'date_deadline', 'priority'],
          },
        },
        id: 1,
      });

      return response.data.result || [];
    } catch (error) {
      console.error('Failed to fetch tasks from Odoo:', error);
      return [];
    }
  }

  async createTask(name: string, description?: string): Promise<OdooTask | null> {
    try {
      if (!this.uid) await this.authenticate();

      const response = await axios.post(`${ODOO_URL}/web/dataset/call_kw/project.task/create`, {
        jsonrpc: '2.0',
        method: 'call',
        params: {
          model: 'project.task',
          method: 'create',
          args: [
            {
              name,
              description: description || '',
              user_id: this.uid,
            },
          ],
        },
        id: 1,
      });

      if (response.data.result) {
        return {
          id: response.data.result,
          name,
          description,
        };
      }
      return null;
    } catch (error) {
      console.error('Failed to create task in Odoo:', error);
      return null;
    }
  }

  async updateTask(taskId: number, updates: Partial<OdooTask>): Promise<boolean> {
    try {
      if (!this.uid) await this.authenticate();

      const response = await axios.post(`${ODOO_URL}/web/dataset/call_kw/project.task/write`, {
        jsonrpc: '2.0',
        method: 'call',
        params: {
          model: 'project.task',
          method: 'write',
          args: [[taskId], updates],
        },
        id: 1,
      });

      return response.data.result !== false;
    } catch (error) {
      console.error('Failed to update task in Odoo:', error);
      return false;
    }
  }

  async deleteTask(taskId: number): Promise<boolean> {
    try {
      if (!this.uid) await this.authenticate();

      const response = await axios.post(`${ODOO_URL}/web/dataset/call_kw/project.task/unlink`, {
        jsonrpc: '2.0',
        method: 'call',
        params: {
          model: 'project.task',
          method: 'unlink',
          args: [[taskId]],
        },
        id: 1,
      });

      return response.data.result !== false;
    } catch (error) {
      console.error('Failed to delete task in Odoo:', error);
      return false;
    }
  }
}

export const odooClient = new OdooClient();

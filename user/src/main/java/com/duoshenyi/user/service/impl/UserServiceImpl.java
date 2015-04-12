package com.duoshenyi.user.service.impl;

import com.duoshenyi.user.model.User;
import com.duoshenyi.user.service.UserService;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service implementation of User.
 */
@Service
@Transactional
public class UserServiceImpl implements UserService{

    private static final Logger LOG = LoggerFactory.getLogger(UserServiceImpl.class);

    private SessionFactory sessionFactory;

    @Autowired
    public UserServiceImpl(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    @Override
    public boolean exists(String account) {
        Criteria criteria = sessionFactory.getCurrentSession().createCriteria(User.class);
        criteria.setProjection(Projections.rowCount())
                .add(Restrictions.eq("account", account));

        return (Long)criteria.uniqueResult() > 0;
    }

    @Override
    public User addUser(User user) {
        Session session = sessionFactory.getCurrentSession();
        session.save(user);
        return user;
    }

    @Override
    public List<User> getUsers() {
        Session session = sessionFactory.getCurrentSession();
        Criteria criteria = session.createCriteria(User.class);
        return criteria.list();
    }

    @Override
    public List<User> getUsers(String filterText) {
        Session session = sessionFactory.getCurrentSession();
        Criteria criteria = session.createCriteria(User.class);

        if(filterText != null && !filterText.isEmpty()){
            StringBuilder filterBuilder  = new StringBuilder();
            filterBuilder.append('%');
            filterBuilder.append(filterText);
            filterBuilder.append('%');

            String filterString = filterBuilder.toString();
            LOG.debug("filterString:{}", filterString);
            criteria.add(
                    Restrictions.or(
                            Restrictions.like("name", filterString),
                            Restrictions.like("account", filterString),
                            Restrictions.like("mobilePhone", filterString)
                    )
            );
        }
        return criteria.list();
    }

    @Override
    public User removeUser(String userId) {
        Session session = sessionFactory.getCurrentSession();
        User user = (User)session.load(User.class, userId);
        if(user != null){
            session.delete(user);
        }
        return user;
    }

    @Override
    public void updateUser(User user) {
        Session session = sessionFactory.getCurrentSession();
        session.update(user);
    }


}

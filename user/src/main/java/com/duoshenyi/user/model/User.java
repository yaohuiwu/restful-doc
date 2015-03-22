package com.duoshenyi.user.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Arrays;
import java.util.Date;

@Entity
@Table(name = "t_user")
public class User {

	private String id;
	private String name;
    private String account;
    private byte[] password;
    private String mobilePhone;
    private Date createTime;

    public User() {
    }

    @Id
    @GeneratedValue(generator="hibernate-uuid")
    @GenericGenerator(name="hibernate-uuid",strategy="uuid")
    public String getId() {
        return id;
    }

    @Column(name = "name")
    public String getName() {
        return name;
    }

    @Column(name = "account")
    public String getAccount() {
        return account;
    }

    @Column(name = "password")
    public byte[] getPassword() {
        return password;
    }

    @Column(name = "mobilePhone")
    public String getMobilePhone() {
        return mobilePhone;
    }

    @Column(name = "createTime")
    public Date getCreateTime() {
        return createTime;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public void setPassword(byte[] password) {
        this.password = password;
    }

    public void setMobilePhone(String mobilePhone) {
        this.mobilePhone = mobilePhone;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    @Override
    public String toString() {
        return "User{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", account='" + account + '\'' +
                ", password=" + Arrays.toString(password) +
                ", mobilePhone='" + mobilePhone + '\'' +
                ", createTime=" + createTime +
                '}';
    }
}
